# ReGround - Agent Reference

## What This App Is

ReGround is an iOS screen time reduction app. The product goal is simple social media blocking for everyday users, with an especially easy flow for less technical users. The app rewards time away from the screen with a growing blossom tree and short interrupt missions.

Target market: US App Store.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 55 + Expo Router |
| Runtime | React Native 0.83.6 |
| Language | TypeScript + Swift |
| Auth | Firebase Auth |
| Database | Firestore |
| Local storage | AsyncStorage + UserDefaults/App Group |
| Native iOS | FamilyControls, DeviceActivity, ManagedSettings |
| Build | Local (Mac) — no EAS credits available |
| Node | 20.19.4 |

Do not add `react-native-reanimated` or `react-native-worklets`. They crash on iOS 26 during worklets initialization.

---

## Current Product State

- Latest uploaded TestFlight build: 57, uploaded 2026-07-09.
- Auth flow works with Firebase email/password, Google, and Apple sign-in.
- Onboarding is now a futuristic baseline scan. It asks purpose, age, average phone time, and target reduction, then routes to Screen Time setup.
- Garden, interrupt, home, block, and settings flows exist with the current darker/futuristic visual direction.
- Screen Time permission + picker + monitoring are implemented in native Swift.
- Extensions (RegrounddMonitor + RegrounddShield + RegrounddShieldAction) are included with correct iOS 26 extension point identifiers.
- Blocking works end-to-end on device. Shield action buttons are present and should continue to be verified after native changes.
- RevenueCat payment wiring exists. Free users can protect one individual app; Pro users unlock multiple apps/categories/websites when `EXPO_PUBLIC_PURCHASES_ENABLED=true`.
- Apple Distribution certificate is installed in keychain (one-time setup, already done).

---

## Build Process (Local Only — No EAS)

The full release pipeline runs locally on Mac. There are no EAS credits. Always use this sequence:

```bash
# 1. Regenerate iOS project
npx expo prebuild --platform ios --clean

# 2. Install pods
cd ios && LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 pod install && cd ..

# 3. Archive
xcodebuild archive \
  -workspace ios/ReGround.xcworkspace \
  -scheme ReGround \
  -configuration Release \
  -archivePath ios/build/ReGround.xcarchive \
  -allowProvisioningUpdates \
  2>&1 | tail -5

# 4. Export IPA
xcodebuild -exportArchive \
  -archivePath ios/build/ReGround.xcarchive \
  -exportPath ios/build/export \
  -exportOptionsPlist ExportOptions.plist \
  -allowProvisioningUpdates \
  2>&1 | tail -5

# 5. Upload to TestFlight
xcrun altool --upload-app -f ios/build/export/ReGround.ipa \
  -t ios -u agergosoma@gmail.com -p XXXX-XXXX-XXXX-XXXX
```

The app-specific password format is `xxxx-xxxx-xxxx-xxxx`. Generate at appleid.apple.com. Do not commit it anywhere.

For device testing only (no TestFlight):
```bash
npx expo run:ios --device 00008120-000C19323A62601E --configuration Release
```

**Important:** Always use `--configuration Release` for device testing. Debug builds require Metro and fail with "no script url" when launched standalone.

---

## Design Direction

Legacy nature palette:
```
Background:  #FAF6F1
Primary:     #5B8C6A
Accent:      #C4A882
Terracotta:  #D4856A
Text dark:   #2C2420
Text muted:  #7A6E63
Text faint:  #B0A498
Border:      #EBE3D8
Card:        #FFFFFF
Pink tree:   #E8A0B4
```

Typography: system font only, `letterSpacing: -0.3` on headings.

Current direction is darker and more futuristic in the main app:
- Primary dark background: `#07110D`
- Light text: `#ECF6EE`
- Glow/active green: `#9AF2B5`
- Use depth through shadows, translucent panels, and clear hierarchy.
- Do not introduce a heavy UI library.
- Do not use custom nested scroll wheels in onboarding; the age field is a simple bounded text input, and screen-time is a bounded hours input with small controls.

---

## Project Structure

```
mobile-app/
|- app/
|  |- _layout.tsx
|  |- (auth)/
|  |- (tabs)/
|  |  |- _layout.tsx       ← tab nav config
|  |  |- index.tsx         ← Home
|  |  |- limits.tsx        ← Block (Screen Time UI)
|  |  |- garden.tsx
|  |  |- profile.tsx
|  |  |- interrupt.tsx
|  |  |- community.tsx     ← hidden from tab bar (href: null)
|  |  |- events.tsx        ← hidden
|  |  |- leaderboard.tsx   ← hidden
|  |  |- settings.tsx      ← hidden
|  |- interrupt/
|  |- onboarding/
|- src/
|  |- context/
|  |- constants/
|  |- lib/
|  |- hooks/
|- modules/
|  |- screen-time/         ← FamilyControls native module
|  |- screen-time-tracker/ ← lock/unlock tracker (no special entitlement)
|- plugins/
|  |- withPodfileSigningFix.js
|  |- withScreenTimeExtensions.js
|  |- withReleaseStartupFixes.js
|- ExportOptions.plist      ← used for local archive export
```

---

## Navigation

Bottom tabs (order matters — interrupt must be index 3 of 5 to appear centered):
1. Home
2. Block (limits.tsx)
3. Take a Break (interrupt — center button)
4. Garden
5. Profile

Hidden routes (href: null): community, events, leaderboard. Settings is available from the tab bar in the current app.

---

## Authentication

Auth uses Firebase Auth + Firestore. Do not reintroduce brittle auth redirect loops. The root layout uses a guarded redirect pattern. User profile data lives in `src/context/AuthContext.tsx`.

Provider notes:
- Google iOS client ID is read from `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`.
- Google URL scheme is configured in `app.json`.
- Apple sign-in can return no email after first consent; never write `undefined` fields to Firestore.
- `AuthContext` strips `undefined` profile values before `setDoc`.

## Payments / Pro

RevenueCat code lives in `src/lib/subscription.ts`; paywall UI lives in `app/paywall.tsx`.

Current product model:
- Free: one individual app can be protected.
- Pro: multiple apps, categories, and websites can be protected.
- Entitlement expected in RevenueCat: `pro`.
- Product IDs currently expected: `com.reground.pro.monthly` and `com.reground.pro.yearly`.
- Runtime switch: `EXPO_PUBLIC_PURCHASES_ENABLED=true`.
- iOS SDK key: `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`.

Important behavior:
- `isProfilePro()` returns true while purchases are disabled, so TestFlight/general app testing does not lock people out.
- When purchases are enabled, `AuthContext` syncs RevenueCat customer info after login/startup.
- Manual Pro overrides are supported through profile fields for testers/early users.
- Do not use RevenueCat `test_...` keys in release/TestFlight builds; those trigger RevenueCat safety warnings/crashes.

---

## Native Modules

### `modules/screen-time`

Real FamilyControls/DeviceActivity implementation. Not a stub.

Key files:
- `modules/screen-time/ios/ScreenTimeModule.swift` — main module
- `modules/screen-time/ios/ObjCExceptionCatcher.h/.m` — required ObjC wrapper
- `modules/screen-time/ios/Extensions/RegrounddMonitor.swift` — blocks apps at threshold
- `modules/screen-time/ios/Extensions/RegrounddShield.swift` — custom block screen UI
- `modules/screen-time/src/index.ts` — JS/TS interface

Implemented:
- `requestAuthorization` — triggers Apple's Screen Time permission popup
- `presentAppPicker` — shows FamilyActivityPicker sheet
- `startMonitoring(limitMinutes)` — starts DeviceActivityCenter monitoring
- `stopMonitoring` — stops monitoring and clears shields
- `getStatus` — returns monitoring/shield state
- `extendLimitByMinutes` / `removeShieldPermanently` — manual overrides

ObjC exception wrapping is required around all FamilyControls calls. Swift `do/catch` is not enough.

### `modules/screen-time-tracker`

Tracks lock/unlock based screen-off time. No special entitlement. Active and stable.

---

## iOS Extensions

Two extension targets, both required for blocking to work:

| Target | Bundle ID | Purpose |
|---|---|---|
| RegrounddMonitor | com.reground.app.monitor | Applies shields when daily limit is reached |
| RegrounddShield | com.reground.app.shield | Custom block screen appearance |

**iOS 26 extension point identifiers (critical):**
- Monitor: `com.apple.deviceactivity.monitor-extension`
- Shield config: `com.apple.ManagedSettingsUI.shield-configuration-service`
- Shield action: `com.apple.ManagedSettings.shield-action-service` ← note: no "UI" in this one

These changed from iOS 16-17 values. The old identifiers cause App Store Connect error 90349. Do not revert them.

**iOS 26 ShieldAction API change (critical):**
- Old (iOS 16-17): `ShieldActionExtension` from `ManagedSettingsUI`, parameter type `Application`, label `_ action:`
- New (iOS 26): `ShieldActionDelegate` from `ManagedSettings`, parameter type `ApplicationToken`, label `action:`
- Framework for RegrounddShieldAction target: `ManagedSettings` only (not ManagedSettingsUI)

Extensions are wired by `plugins/withScreenTimeExtensions.js`. The plugin:
- Copies Swift source files into `ios/RegrounddMonitor/` and `ios/RegrounddShield/`
- Creates extension targets with correct build phases (Sources + Frameworks)
- Sets build settings (deployment target, signing, entitlements, install path)
- Adds target dependencies so the main app embeds the extensions
- Excludes extension Swift files from the main app's Sources phase

---

## Apple Developer Portal Setup

All three App IDs are registered and configured:

| App ID | Capabilities |
|---|---|
| com.reground.app | Family Controls (Dev + Dist + App & Website Usage), App Groups, Push |
| com.reground.app.monitor | Family Controls (Dev + Dist), App Groups |
| com.reground.app.shield | Family Controls (Dev + Dist), App Groups |

App Group: `group.com.reground.app`
Apple Team: `R7S2QRVP89`
App Store Connect App ID: `6767633948`
Apple ID: `agergosoma@gmail.com`

Provisioning is Automatic. The main app, monitor, and shield targets all have:
- `CODE_SIGN_STYLE = Automatic`
- `DEVELOPMENT_TEAM = R7S2QRVP89`

When building with xcodebuild, always pass `-allowProvisioningUpdates` so Xcode can refresh provisioning profiles.

---

## app.json Notes

Important settings:
- `newArchEnabled: false`
- `ios.infoPlist.RCTNewArchEnabled: false`
- `ios.appleTeamId: "R7S2QRVP89"`
- `ios.buildNumber` — increment this before each TestFlight upload
- FamilyControls entitlements in `ios.entitlements`
- App group: `group.com.reground.app`
- Plugin order includes withPodfileSigningFix, withScreenTimeExtensions, and withReleaseStartupFixes

The `extra.eas.build.experimental.ios.appExtensions` block is still in app.json but is not used for local builds. It is harmless.

`withReleaseStartupFixes` also ensures a valid iOS `AppIcon.appiconset` is generated during clean prebuild. This fixed build 57 archive failures where Xcode could not find `AppIcon`.

---

## Known iOS / Native Issues

1. No Reanimated / worklets — crashes on iOS 26.
2. FamilyControls calls must stay wrapped with ObjC exception handling.
3. `newArchEnabled: false` — do not change this.
4. Screen Time permission popup only appears if Screen Time is already enabled on the device (Settings → Screen Time). If a user gets "notDetermined" without seeing a popup, they need to enable Screen Time in Settings first.
5. Extension point identifiers are iOS 26 specific. Do not change them back.
6. Clean prebuild can require manual `pod install` with locale variables because CocoaPods may hit `Spec_Lock` permission/encoding issues.
7. If archive fails copying `ReactNativeDependencies.xcframework/ios-arm64`, check whether CocoaPods unpacked the release artifact fully.

---

## Roots / Tree Growth

Roots are the one consistent points system.

- Missions and active protection award Roots.
- Roots grow the user's tree.
- Roots can also be spent to intentionally change/stop limits.
- Tree stage rendering lives in `app/(tabs)/garden.tsx`.
- The realistic tree assets live in `assets/trees/tree1.png` through `tree10.png`; do not replace them casually.

---

## Mission Library

`src/lib/missionLibrary.ts`

Duration type: `1 | 2 | 5 | 10 | 15 | 30` minutes.
IDs q1–q15 are 1–2 minute quick missions added in build 29.
`hasShort` filter uses `durationMinutes <= 5`.

---

## Limit Slider Zones

`app/(tabs)/limits.tsx` — `SLIDER_MIN = 5`, `SLIDER_MAX = 720` (12 hours)

| Range | Zone | Colour |
|---|---|---|
| ≤ 360 min (6h) | safe | `#5B8C6A` |
| 361–480 min (6–8h) | caution | `#C4923A` |
| > 480 min (8h+) | danger | `#D4856A` |

Warning text appears below the slider in caution/danger zones.

---

## Current Priorities

1. Verify RevenueCat purchase/restore in TestFlight sandbox once App Store products and In-App Purchase key config are complete.
2. Verify free app limit: one individual app allowed; multiple apps/categories/websites route to paywall.
3. Keep testing Screen Time permission, picker persistence, monitoring, and custom shield after every native/prebuild change.
4. Polish paywall copy/design so it feels like Pro unlocks stronger protection, not punishment.
5. App Store polish: screenshots, privacy policy page, support URL, review notes explaining Screen Time usage.
6. Revoke old app-specific password if exposed and generate a fresh one before future uploads.

---

## Editing Rules

- ASCII quotes in code.
- Read files before editing.
- Use `--configuration Release` for all device builds.
- Avoid new dependencies unless truly necessary.
- Prefer simple UI over clever UI.
- Keep native Screen Time logic in Swift. JS is a thin orchestration layer.
- Increment `ios.buildNumber` in app.json before every TestFlight upload.
