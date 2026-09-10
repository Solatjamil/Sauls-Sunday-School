# Android app (Capacitor wrap)

The web app *is* the Android app: same files, same offline store, wrapped with
Capacitor so it can go on the Play Store and update like an app.

## One-time setup (needs Android Studio + SDK, which this repo does not carry)

```bash
npm install                      # @capacitor/core, /android, /cli, preferences, share
npx cap add android              # generates android/ from capacitor.config.json
npx cap sync android             # copies dist/ into the app and registers plugins
```

`capacitor.config.json` already points at `webDir: "dist"`, so **always run
`node build.js` before `npx cap sync android`.**

```bash
node build.js && npx cap sync android
npx cap open android             # then Run ▶ on a device/emulator
cd android && ./gradlew assembleDebug     # APK at android/app/build/outputs/apk/debug/
./gradlew bundleRelease                   # AAB for Play
```

## Icons and splash

Generated for you in `assets/android/` (16 PNGs: launcher densities, round,
adaptive foreground, and a 2732² splash). Copy them into the native project:

```bash
mkdir -p android/app/src/main/res
for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  mkdir -p android/app/src/main/res/mipmap-$d
  cp assets/android/ic_launcher-$d.png      android/app/src/main/res/mipmap-$d/ic_launcher.png
  cp assets/android/ic_launcher-round-$d.png android/app/src/main/res/mipmap-$d/ic_launcher_round.png
done
mkdir -p android/app/src/main/res/drawable
cp assets/android/splash.png android/app/src/main/res/drawable/splash.png
```

Regenerate them with the same PIL script used during the build (see README
history), or edit `assets/icons/favicon.svg` and re-export.

## What the wrap does, and does not, need

- **No permissions.** No camera, no contacts, no location, no account list. The
  app stores its own data on-device. Play data-safety form: data not collected.
- **Network state only** — `navigator.onLine` is read for the offline banner; no
  permission required.
- `@capacitor/preferences` is installed and *optional*: if you want the child’s
  progress to survive “clear app data”, switch `js/core/store.js` to prefer the
  plugin when `window.Capacitor` exists. The fallback (localStorage) is what ships.
- `@capacitor/share` lets a teacher send a printed sheet as a file; the app uses
  it only when present and falls back to a download link.
- Back button: Capacitor’s default is fine — the router already pops one level,
  and `Esc`/back on a unit returns home rather than closing the app.
- Speech: Android’s TTS engine is what `speechSynthesis` uses. Urdu narration
  works if the device has an Urdu voice installed; if not, the app silently
  stays in read-only mode with the highlight still running.

## Store listing notes

Free · no ads · no in-app purchases · no tracking. Ages: “Everyone”, with a
parental note that content for 10–12 includes the crucifixion and Bible
judgement narratives, stated plainly and age-appropriately. Privacy policy URL
must exist even though nothing is collected — a one-page statement that the app
stores progress on the device only is honest and sufficient.
