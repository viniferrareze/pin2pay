//Bibliotecas
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <FirebaseObject.h>
#include <SPI.h>
#include <RFID.h>

//defines - mapeamento de pinos do NodeMCU
#define D0    16
#define D1    5
#define D2    4
#define D3    0
#define D4    2
#define D5    14
#define D6    12
#define D7    13
#define D8    15
#define D9    3
#define D10   1
#define SD2   9
#define SD3   10

//RFID
#define SS_PIN SD3
#define RST_PIN SD2
#define pinVermelho D1
#define pinVerde    D2 

RFID rfid(SS_PIN, RST_PIN);


String rfid_old;

//Constantes
const String FIREBASE_HOST = "pin2pay-4d41d.firebaseio.com";
const String FIREBASE_AUTH = "XbWapuVIqxvzrwSl5p01FvDQBXkUajckzdcfBzER";
const char* WIFI_NAME      = "¬¬'";
const char* WIFI_PASSWORD  = "12345678ab";
const String ID_EQUIPAMENTO = "-1";   

boolean connectWifi(){
   WiFi.begin(WIFI_NAME, WIFI_PASSWORD);
   Serial.println("---------------WIFI-----------------------");
   Serial.println("Aguarde conectando na rede: "+ WiFi.SSID());
  
  while (WiFi.status() != WL_CONNECTED) {
      Serial.print(".");
      delay(500);
   }

  Serial.println();  
  Serial.println();
  Serial.print("Conectado com o IP: ");
  Serial.println(WiFi.localIP());    
  Serial.println("------------------------------------------");

 return true;   
}

void connectFirebase(){
  Serial.println("Conectando no FIREBASE....");
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); 
}

void postFirebase(String path, JsonObject& obj){
   Firebase.push(path, obj);
  
   if (Firebase.success()){
     Serial.println("SUCESSO!");
   } else {
     Serial.println("ERRO!");
   }
}

String leitorRFID(){
  int serNum0;
  int serNum1;
  int serNum2;
  int serNum3;
  int serNum4;

 String rfid_new;

 if (rfid.isCard()){
    if (rfid.readCardSerial()) {
        serNum0 = rfid.serNum[0];
        serNum1 = rfid.serNum[1];
        serNum2 = rfid.serNum[2];
        serNum3 = rfid.serNum[3];
        serNum4 = rfid.serNum[4];
        
        rfid_new = serNum0;
        rfid_new = rfid_new + serNum1;
        rfid_new = rfid_new + serNum2;
        rfid_new = rfid_new + serNum3;
        rfid_new = rfid_new + serNum4;
    }
  }

 rfid.halt();

 return rfid_new;
}


void deleteFirebase(String path){
  Firebase.remove(path);
}


void getFilaReq(){
   String path      = "/fila_req/"+ID_EQUIPAMENTO;
   String valor     = "";
   String nome      = "";
   String tagRFID   = "";
   int iTipo = 0;
     
   FirebaseObject object = Firebase.get(path);
   nome  = object.getString("nome");


   if (nome != ""){
      digitalWrite(pinVermelho, LOW); 
      digitalWrite(pinVerde, HIGH);  

      tagRFID = leitorRFID();
      if (tagRFID != ""){
         StaticJsonBuffer<200> jsonBuffer;
         JsonObject& objeto = jsonBuffer.createObject();
        
         Serial.println(tagRFID);

         path = "/fila_resp";
         objeto["nome"] = nome;
         objeto["pin"]  = tagRFID;
         postFirebase(path, objeto);           
 

         String path = "/fila_req/"+ID_EQUIPAMENTO; 
         deleteFirebase(path);
      }
      
      
   } else {
      digitalWrite(pinVermelho, HIGH);     
      digitalWrite(pinVerde, LOW);     
   }

}

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.init();  

  pinMode(pinVermelho, OUTPUT);
  pinMode(pinVerde, OUTPUT);
  
  if (connectWifi()) {
     connectFirebase();  
  }
}

void loop() {
  /*
  String valorRFID = leitorRFID();
  String idRequisicao = "-KwwU2nS5HZfW6wQYFko";
  
  if (valorRFID != "304"){
     Serial.println(valorRFID);
     postFirebase(valorRFID);
  }


  deleteFirebase(idRequisicao);

  */

  getFilaReq();

  
}
