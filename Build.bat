ionic cordova build --release android --prod
Cd C:\Sumit\memorelink.com\SourceCode\memorelink_mobile\memorelink\platforms\android
gradlew.bat bundle
Cd C:\Sumit\memorelink.com\SourceCode\memorelink_mobile\memorelink\platforms\android\app\build\outputs\apk\release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\Sumit\memorelink.com\SourceCode\memorelink_mobile\memorelink\platforms\android\app\build\outputs\apk\release\memorelink-key.keystore C:\Sumit\memorelink.com\SourceCode\memorelink_mobile\memorelink\platforms\android\app\build\outputs\bundle\release\app.aab MeMoreLink
