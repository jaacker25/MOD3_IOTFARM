# The ultimate IoT Smart Farming

Link del Demo [aqui](https://theultimateiotsmartfarming.netlify.com)

## ¿Cómo surgio la idea? 🚀
Soy un apasionado de la ingenieria electrónica y un tema recurrente que ademas es tendencia en el que se unen tanto la electronica como el desarrollo web es el IoT (Internet de las Cosas).
Actualmente encontramos IoT en bastantes dispositivos de uso domestico como relojes, asistentes personales, iluminación, refirgeradores, etc. Pero la pregunta es ¿Qué hay más alla? ¿Qué aplicaciones hay en otros sectores de mayor relevancia e impacto? Siempre he tenido el interes por temas como la contaminación, el impacto ambiental, el ahorro de recursos y asi es como encontré IoT aplicado al sector de Agricultura, donde a traves de dispositivos electronicos provistos de sensores que miden las condiciones ambientales y de suelo, permiten recopilar infromación necesaria que ayuda a tener un mejor control de uso de riego, fertilizantes y pesticidas lo que se traduce en un ahorro considerable de recursos y mayor producción. 

## El reto 🚀
Crear un prototipo electronico con ayuda de un modulo ESP32 provisto de un GPS y sensores (temperatura/humedad ambiental,humedad de suelo e intensidad de luz ambiental) que nos ayude a tomar los datos muestra y los recopile en una base de datos en la nube, luego entonces poder recopilar dichos datos, reesctructurarlos y mostrarlos de manera grafica en una aplicación web (Single page Application) utilizando React.js.

![alt text](https://res.cloudinary.com/jaacker25/image/upload/v1583803450/IOTFARM/tttt_vgynfx.png)

## El resultado 🚀

Se logró la implementación completa de la idea utilizando un prototipo funcional del dispositivo electronico.
La platafroma ademas de mostrar graficamente los datos obtenidos de los sensores asi como su ubicación exacta, ayuda a tener una mayor organización implementando proyectos que engloban una area de inspección en concreto añadiendole datos descriptivos que facilitan la identificacion del proyecto que se esta analizando. 

![alt text](https://res.cloudinary.com/jaacker25/image/upload/v1583806190/IOTFARM/rtrtrt_heufka.png)
![alt text](https://res.cloudinary.com/jaacker25/image/upload/v1583806309/IOTFARM/tttrrrr_iyirxi.png)

## ¿Cómo hacer uso la aplicación? ⚙️
### Requerimientos
* Cuenta en Cloudinary
* MongoDB (Servidor local o Mongo Atlas)
### Comenzando
* Para utilizar la aplicación hay que clonar el repo:
`https://github.com/jaacker25/MOD3_IOTFARM.git`
### Backend
* Dentro de la carpeta Server correspondiente al Back End se debe agregar un archivo .env con la siguiente configuración:
```
PORT=3000
ENV=development
DB=[MONGODB URL]
FRONTENDPOINT=http://localhost:3001
SECRET=[ANY PASSPHRASE]
CLOUDINARY_NAME=[NAME OF CLOUDINARY ACCOUNT]
CLOUDINARY_KEY=[KEY OF CLOUDINARY ACCOUNT]
CLOUDINARY_SECRET=[SECRET OF CLOUDINARY ACCOUNT]
```
* Dentro de la carpeta Server abrir la terminal y correr el siguiente comando:
`npm i`
`npm run dev`

### Frontend
* Dentro de la carpeta Server correspondiente al Back End se debe agregar un archivo .env con la siguiente configuración:
```
REACT_APP_MAPBOX_ACCESS_TOKEN=[TOKEN OF MAPBOX ACCOUNT]
```
* Dentro de la carpeta Client abrir la terminal y correr el siguiente comando:
`npm i`
`npm run start`

### Probar la DEMO
* Para probar la demo se puede hacr uso de la siguiente cuenta:
```
email: jaguilar.ice@gmail.com
password: 1!1
```
* Los sensores habilitados que permite agregar la aplicación en la sección donde encontramos el codigo de barras son los siguientes:
```
1006090
1006098
1006099
1006100
```

## Construido con 🛠️
React, MongoDB, NodeJs, Express, Cloudinary, Material-UI, CSS, Chart.js, Mapbox-GL

## Equipo de trabajo ✒️
Unico autor y desarrollador de este proyecto:
**Jorge Aguilar** - *Web Developer* - [contact](https://www.linkedin.com/in/jorge-aguilar-castillo/)



