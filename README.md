# CLIENT-SIDE MULTIVIEW APP
An HTML JS application which plays dual stream. The app can play the streams using Shaka, Videotag or AAMP.

## Hosted Endpoint
The app is hosted in server as https://cpetestutility.stb.r53.xcal.tv/VideoTestStream/public/aamptest/testApps/client-side-multiview-app/index.html

## App UI
![App UI](https://cpetestutility.stb.r53.xcal.tv/VideoTestStream/public/aamptest/testApps/client-side-multiview-app/multiviewUI.PNG)

## Usage
- The initial UI will have two screens A and B side by side.
- There will be two drop-down lists. One to select streams for Screen A and one to select streams for Screen B.
- User can use arrow keys to navigate between items and switch between screens. 

## Player Selection
- By Default the Test App uses Shaka MSE EME Player.
- The app can be configured to use either Shaka, VideoTag or AAMP.
- Change in app.js:

```javascript
const playerEngine = playerEngineOptions.shaka;
//or
const playerEngine = playerEngineOptions.aamp;
//or
const playerEngine = playerEngineOptions.videtag;
```
