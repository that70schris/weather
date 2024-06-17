// swift-tools-version: 5.10
import PackageDescription

let package = Package(
  name: "codes.bailey.weather",
  platforms: [
    .macOS(.v14),
  ],
  dependencies: [
    .package(url: "https://github.com/raycast/extensions-swift-tools.git", from: "1.0.4"),
    .package(url: "https://github.com/malcommac/SwiftLocation.git", from: "6.0.0"),
  ],
  targets: [
    .executableTarget(
      name: "weather",
      dependencies: [
        .product(name: "RaycastSwiftMacros", package: "extensions-swift-tools"),
        .product(name: "RaycastSwiftPlugin", package: "extensions-swift-tools"),
        .product(name: "RaycastTypeScriptPlugin", package: "extensions-swift-tools"),
        "SwiftLocation",
      ],
      linkerSettings: [
        .unsafeFlags([
          "-Xlinker", "-sectcreate",
          "-Xlinker", "__TEXT",
          "-Xlinker", "__info_plist",
          "-Xlinker", "./Info.plist"
        ])
      ]
    ),
  ]
)
