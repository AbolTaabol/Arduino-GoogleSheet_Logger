#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>

#include "arduino_secrets.h"
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
/////// Wifi Settings ///////
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

unsigned long lastUpdate = 0;
int interval = 10000;

const char serverAddress[] = "script.google.com";  // server address
int port = 443;

WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);
int status = WL_IDLE_STATUS;

void setup() {
  Serial.begin(9600);
  while (!Serial);
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);     // print the network name (SSID);

    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);
  }

  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {

  // Print updates every interval
  if (millis() - lastUpdate > interval) {

    // assemble the path for the GET message:
    String path = "/macros/s/AKfycbyI087DzrCmJDkPsi6ZN1mNB-Tt5Z9YcYxm634NzRwn5ys3zxxDKrwTs-T_UABn685tzw/exec?Red=122&Green=43&Blue=22&Brightness=112";

    // send the GET request
    Serial.println("making GET request");
    client.get(path);

    lastUpdate = millis();
  }


}
