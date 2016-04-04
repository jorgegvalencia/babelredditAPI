// Topic
{
	_id: String, // id del topic
	title: String, // título del topic
	description: String, // descripción del topic
	nsubs: Integer, // número de suscriptores (?)
	rules: String, // texto con las reglas del topic
	category: String, // id de la categoria del topic, seleccionada de un listado inicial
}

// Post
{
	_id: String, // id del post
	topic: String, // id del topic al que pertenece
	title: String, // título del post
	author: String, // id del usuario que ha creado el post
	creation_date: String, // string en formato ISO de la fecha de creación
	last_edit_date: String, // string en formato ISO de la última fecha de creación
	upvotes: [String], // id de usuarios que han votado positivamente
	downvotes: [String], // id de usuarios que han votado negativamente
	description: String, // descripcion inicial (opcional) del post
	link: String, // String de una URL externa, o uri del propio post
	thumbnail: String, // uri local del fichero de la imagen (**)
}

// Comment
{
	_id: String, // id del comentario
	post: String, // id del post al que pertenece
	userid: String, // id del usuario
	username: String, // nombre del usuario
	text: String, // texto del comentario
	upvotes: [String], // id de usuarios que han votado positivamente
	downvotes: [String], // id de usuarios que han votado negativamente
	reference: String, // id del comentario respuesta (si es el id del propio comentario es referente al post)
}

// Users
{
	_id: String, // id del usuario
	username: String, // nickname del usuario
	email: String, // email del usuario
	password: String, // hash de la contraseña del usuario
	topics: [{topicid: String, topicname: String}], // topics a los que esta suscrito el usuario
}

// Categories
{
	_id: String, // id de la categoría
	categoryname: String, // nombre de la categoría
	topics: [{topicid: String, topicname: String}], // topics que pertenecen a la categoría
}