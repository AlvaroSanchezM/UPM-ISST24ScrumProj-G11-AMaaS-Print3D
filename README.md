# UPM-ISST24ScrumProj-G11-AMaaS-Print3D
AMaaS – Marketplace de fabricación aditiva como servicio. Desarrollo de MVP con metodología SCRUM.

Universidad Politécnica de Madrid
Asignatura: Ingeniería de Sistemas y Servicios Telemáticos (ISST)
Trabajo en grupo, Grupo 11

Se ha utilizado metodología SCRUM para realizar este trabajo en 3 Sprints, de 4 semanas cada uno.

Autores:
 - Tutor: Samuel Yod
 - Estudiantes: Juanjo Arlandis, Álvaro Sánchez, Irina Blaj, Sergio Jiménez, Silvia Rodríguez Hernández

Roles del equipo SCRUM:
 - Samuel Yod . . . . . . . . . Client . . . . . . . . . . . . . . . ****************
 - Juanjo Arlandis. . . . . . . SCRUM Master + Software Developer. . jj.arlandis@alumnos.upm.es
 - Álvaro Sánchez . . . . . . . Product Owner + Software Developer . alvaro.sanchezm@alumnos.upm.es
 - Irina Blaj . . . . . . . . . Software Developer . . . . . . . . . irina.blaj@alumnos.upm.es
 - Sergio Jiménez . . . . . . . Software Developer . . . . . . . . . sergio.jimenez.sanchez@upm.es
 - Silvia Rodríguez Hernández . Software Developer . . . . . . . . . silvia.rodriguezh@alumnos.upm.es

Caso de estudio: AMaaS, Marketplace de fabricación Aditiva como Servicio

Las tecnologías de fabricación aditiva (additive manufacturing), popularmente conocidas como ‘impresión 3D’, han supuesto una revolución en los procesos de fabricación de piezas y otros objetos físicos. Las características físicas de los procesos de fabricación aditiva, combinadas con la versatilidad de los equipos de impresión y el control por ordenador, permiten producir tiradas reducidas de una gran variedad de productos con un coste limitado y sin apenas supervisión humana1. Además, la sencillez de estos procesos de fabricación aditiva permite distribuir la producción fácilmente de manera remota, de manera que distintos proveedores de procesos de fabricación aditiva puedan ofrecer sus servicios para que cualquier diseñador externo les contrate en línea la fabricación de una o varias piezas. La evolución natural de estos servicios, que proponemos en este caso de estudio, es hacia un marketplace de servicios en línea de impresión 3D, donde un intermediario pone en contacto a los diseñadores con distintos fabricantes entre los que escoger para encargarles la fabricación de piezas impresas en 3D, cubriendo una amplia gama de necesidades a las que los pequeños diseñadores no podrían tener acceso de manera independiente y reduciendo el tiempo de puesta en el mercado.

Funcionalidad del servicio

El proceso típico para el uso de un marketplace como este implica los siguientes pasos:
1) Un diseñador de modelos crea un modelo 3D digital mediante un programa de tipo CAD (diseño asistido por ordenador), o bien a partir del escaneado tridimensional de un objeto físico preexistente. Este modelo se almacena en un fichero digital con un formato específico (p.ej. .STL, .OBJ o .AMF) que contiene información necesaria para la impresión 3D.
2) Por otra parte, un fabricante, que desea ofrecer sus servicios de fabricación a través del marketplace, se registra en este para publicar la información sobre las capacidades de las que dispone, es decir, las características de cada uno de los diversos procesos de fabricación que ofrece: material (de entre un conjunto dado), colores, acabados disponibles, precisión (micras), tamaño máximo de las piezas (‘build envelope’), velocidad de fabricación (mm3/h), localización geográfica de las impresoras y unidades disponibles, etc. y el precio de sus servicios (que puede incluir componentes fijas y variables).
3) El diseñador que desea realizar un pedido envía al marketplace una solicitud de impresión, proporcionando un fichero con el diseño que la pieza desea imprimir, el número de unidades, y los parámetros de fabricación requeridos: material(es) preferidos y otras características, límite de plazos de fabricación y entrega, tipo de relleno (infill), localización geográfica y dirección de envío… El marketplace le ofrece una selección de proveedores que cumplen los requisitos, de entre los que el diseñador escoge uno de ellos para realizar el pedido.
Antes de lanzar un pedido, se debe validar que el diseño del modelo 3D proporcionado en el fichero es correcto, ya que no cualquier diseño es susceptible de ser impreso. En caso de que sea incorrecto, se pueden aplicar algunas correcciones automáticas o devolvérselo al autor. Este proceso de validación se podría hacer manualmente por un revisor, pero en la práctica hoy en día se recurre a herramientas automatizadas, algunas de las cuales están disponibles como servicios en línea. Como resultado de la validación, se puede presentar una renderización en 3D del modelo.
4) El fabricante recibe una notificación con el pedido, lo acepta (o rechaza), y, tras efectuarse un cargo en el medio de pago del diseñador (a través de una pasarela de pagos), el fabricante utiliza sus propios medios para fabricar la pieza.

El MVP ofrecerá las funcionalidades básicas del marketplace, que incluyen lo necesario para que un diseñador pueda encontrar al fabricante que cumpla sus necesidades, y para gestionar un pedido en colaboración con ambos (diseñador y fabricante). Un marketplace real incluiría funcionalidades avanzadas, como la creación de paquetes o proyectos con varios diseños (a modo de ‘carrito de la compra’) que repartir entre varios fabricantes, modelos tipo subasta donde el fabricante no ofrece un precio fijo, sino que responde con ofertas a los pedidos que recibe, etc. En ningún caso son responsabilidad del marketplace las actividades del diseño de las piezas ni el propio proceso de impresión 3D.

Propuesta de realización

Este caso se asignará a un equipo de trabajo, que seguirá una metodología ágil de desarrollo basada en Scrum para desarrollar un prototipo de Mínimo Producto Viable (MVP), que permita demostrar la funcionalidad del servicio para un escenario típico de uso, la viabilidad del enfoque y la adecuación de la arquitectura software elegida. El equipo seleccionará, completará, elaborará y concretará los requisitos del servicio, respondiendo siempre a los fines del enunciado del caso, y con el asesoramiento del profesor supervisor. Se valorará positivamente que, dentro de las restricciones de tiempo del desarrollo, este esté preparado para una evolución futura que cubra requisitos no implementados en el MVP.

Los usuarios accederán al marketplace a través de navegadores web convencionales. La solución se implementará utilizando las tecnologías indicadas al final de este documento. Para soportar la validación y/o visualización de los diseños, ser podrán utilizar librerías o APIs de servicios de terceros (se sugiere consultar con el profesor la decisión tomada). El servicio deberá cumplir con requisitos de seguridad (autenticación, autorización, confidencialidad, integridad), protegiendo especialmente la propiedad industrial e intelectual de los diseñadores que envían sus diseños a la plataforma. Asimismo, el marketplace deberá estar preparado para cumplir con las reglas que impone la DSA (Digital Services Act) de la UE a los servicios de la sociedad de la información en general, y a servicios de intermediación, plataformas en línea, y marketplaces en línea.
