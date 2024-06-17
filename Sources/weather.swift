import Foundation
import RaycastSwiftMacros
import WeatherKit
import CoreLocation
import SwiftLocation

@raycast
func location() async throws -> Double? {
  let location = Location()
  let current: Tasks.ContinuousUpdateLocation.StreamEvent = try await location.requestLocation(accuracy: [
    .horizontal(10000) // has an horizontal accuracy of 100 meters or lower
  ], timeout: 10)
  return current.location?.coordinate.latitude ??
    current.locations?.first?.coordinate.latitude ?? 1.0
}

@raycast
func enabled() async throws -> Bool {
  let location = Location()
  return await location.locationServicesEnabled
}
