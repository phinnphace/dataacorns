import os
import json
from datetime import datetime, time, timedelta
from zoneinfo import ZoneInfo

import pandas as pd
import requests
from dotenv import load_dotenv

from Homeicordinates import ORIGIN


MATRIX_API_URL = "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix"
ROUTES_API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes"
CSV_PATH = "madison_desintation.csv"
POLYLINES_PATH = "route_polylines.json"

# Use the local timezone for the question you are asking, then send it as an
# RFC 3339 timestamp. Google accepts this for the top-level departureTime.
LOCAL_TIMEZONE = ZoneInfo("America/Chicago")
DEPARTURE_WEEKDAY = 2  # Monday=0, Tuesday=1, Wednesday=2
OUTBOUND_DEPARTURE_TIME = time(17, 0)  # 5:00 PM
RETURN_DEPARTURE_TIME = time(20, 0)  # 8:00 PM


def next_weekday_departure(
    weekday: int = DEPARTURE_WEEKDAY,
    departure_time: time = OUTBOUND_DEPARTURE_TIME,
) -> str:
    """Return the next requested weekday/time as an RFC 3339 timestamp."""
    now = datetime.now(LOCAL_TIMEZONE)
    days_ahead = (weekday - now.weekday()) % 7
    departure = datetime.combine(
        now.date() + timedelta(days=days_ahead),
        departure_time,
        LOCAL_TIMEZONE,
    )

    if departure <= now:
        departure += timedelta(days=7)

    return departure.isoformat()


def lat_lng_waypoint(lat: float, lng: float) -> dict:
    return {
        "waypoint": {
            "location": {
                "latLng": {
                    "latitude": float(lat),
                    "longitude": float(lng),
                }
            }
        }
    }


def route_waypoint(lat: float, lng: float) -> dict:
    return {
        "location": {
            "latLng": {
                "latitude": float(lat),
                "longitude": float(lng),
            }
        }
    }


def restaurant_waypoints(destinations: pd.DataFrame) -> list[dict]:
    return [
        lat_lng_waypoint(row["lat"], row["lng"])
        for _, row in destinations.iterrows()
    ]


def get_matrix_payload(
    origins: list[dict],
    destinations: list[dict],
    departure_time: str,
) -> dict:
    return {
        "origins": origins,
        "destinations": destinations,
        "travelMode": "TRANSIT",
        "transitPreferences": {
            # Other useful option for your argument: "FEWER_TRANSFERS".
            "routingPreference": "LESS_WALKING",
        },
        "departureTime": departure_time,
    }


def fetch_route_matrix(payload: dict, headers: dict) -> list[dict]:
    response = requests.post(MATRIX_API_URL, json=payload, headers=headers, timeout=30)
    response.raise_for_status()
    return response.json()


def get_route_payload(origin: dict, destination: dict, departure_time: str) -> dict:
    return {
        "origin": origin,
        "destination": destination,
        "travelMode": "TRANSIT",
        "transitPreferences": {
            "routingPreference": "LESS_WALKING",
        },
        "polylineQuality": "HIGH_QUALITY",
        "departureTime": departure_time,
    }


def fetch_route_polyline(payload: dict, headers: dict) -> dict:
    response = requests.post(ROUTES_API_URL, json=payload, headers=headers, timeout=30)
    response.raise_for_status()
    data = response.json()
    routes = data.get("routes", [])
    if not routes:
        return {
            "duration": None,
            "distanceMeters": None,
            "encodedPolyline": None,
            "status": "NO_ROUTE_RETURNED",
        }

    route = routes[0]
    return {
        "duration": route.get("duration"),
        "distanceMeters": route.get("distanceMeters"),
        "encodedPolyline": route.get("polyline", {}).get("encodedPolyline"),
        "status": "OK",
    }


def write_route_polylines(
    destinations: pd.DataFrame,
    api_key: str,
    outbound_departure: str,
    return_departure: str,
) -> None:
    home = route_waypoint(ORIGIN["lat"], ORIGIN["lng"])
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
    }

    route_results = []
    for index, row in destinations.iterrows():
        restaurant = route_waypoint(row["lat"], row["lng"])
        outbound_payload = get_route_payload(
            origin=home,
            destination=restaurant,
            departure_time=outbound_departure,
        )
        return_payload = get_route_payload(
            origin=restaurant,
            destination=home,
            departure_time=return_departure,
        )

        print(f"Fetching route geometry for {row['Name']}")
        route_results.append(
            {
                "index": int(index),
                "name": row["Name"],
                "outbound": fetch_route_polyline(outbound_payload, headers),
                "return": fetch_route_polyline(return_payload, headers),
            }
        )

    with open(POLYLINES_PATH, "w", encoding="utf-8") as output_file:
        json.dump(
            {
                "outboundDepartureTime": outbound_departure,
                "returnDepartureTime": return_departure,
                "routes": route_results,
            },
            output_file,
            indent=2,
        )


def response_status_text(status: object) -> str | None:
    if status is None:
        return None
    if isinstance(status, dict):
        return status.get("code") or status.get("message") or json.dumps(status)
    return str(status)


def apply_matrix_results(
    output: pd.DataFrame,
    results: list[dict],
    prefix: str,
    restaurant_index_key: str,
) -> None:
    output[f"{prefix}_duration"] = None
    output[f"{prefix}_distance_meters"] = None
    output[f"{prefix}_condition"] = None
    output[f"{prefix}_status"] = None

    for element in results:
        restaurant_index = element.get(restaurant_index_key)
        if restaurant_index is None:
            continue

        output.at[restaurant_index, f"{prefix}_duration"] = element.get("duration")
        output.at[restaurant_index, f"{prefix}_distance_meters"] = element.get(
            "distanceMeters"
        )
        output.at[restaurant_index, f"{prefix}_condition"] = element.get("condition")
        output.at[restaurant_index, f"{prefix}_status"] = response_status_text(
            element.get("status")
        )


def main() -> None:
    load_dotenv()
    load_dotenv(".env.txt")

    api_key = os.getenv("MAPS_API_KEY")
    if not api_key:
        raise RuntimeError(
            "Set MAPS_API_KEY in your environment, .env, or .env.txt before running "
            "this script."
        )

    destinations = pd.read_csv(CSV_PATH)
    home_waypoint = lat_lng_waypoint(ORIGIN["lat"], ORIGIN["lng"])
    restaurant_locations = restaurant_waypoints(destinations)
    outbound_departure = next_weekday_departure(
        departure_time=OUTBOUND_DEPARTURE_TIME
    )
    return_departure = next_weekday_departure(departure_time=RETURN_DEPARTURE_TIME)

    outbound_payload = get_matrix_payload(
        origins=[home_waypoint],
        destinations=restaurant_locations,
        departure_time=outbound_departure,
    )
    return_payload = get_matrix_payload(
        origins=restaurant_locations,
        destinations=[home_waypoint],
        departure_time=return_departure,
    )

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "originIndex,destinationIndex,status,condition,distanceMeters,duration",
    }

    outbound_results = fetch_route_matrix(outbound_payload, headers)
    return_results = fetch_route_matrix(return_payload, headers)
    output = destinations.copy()
    apply_matrix_results(
        output=output,
        results=outbound_results,
        prefix="outbound",
        restaurant_index_key="destinationIndex",
    )
    apply_matrix_results(
        output=output,
        results=return_results,
        prefix="return",
        restaurant_index_key="originIndex",
    )

    output.to_csv("transit_matrix_results.csv", index=False)
    write_route_polylines(
        destinations=destinations,
        api_key=api_key,
        outbound_departure=outbound_departure,
        return_departure=return_departure,
    )
    print(f"Outbound departure time: {outbound_departure}")
    print(f"Return departure time: {return_departure}")
    print("Saved transit_matrix_results.csv")
    print(f"Saved {POLYLINES_PATH}")


if __name__ == "__main__":
    main()
