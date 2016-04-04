# babelredditAPI
API to serve the babelreddit webapp. requests

## /topics
	**GET**: Devuelve la lista de topics
	**POST**: Crea un topic nuevo
## /topics/[topicid]
	**GET**: Devuelve los datos del topic topicid
	PUT Edita el topic topicid
## /topics/[topicid]/posts
	**GET**: Devuelve la lista de post pertenecientes al topic topicid
	**POST**: Crea un nuevo post bajo el topic topicid
## /topics/[topicid]/posts/[postid]
	**GET**: Devuelve los datos del post postid
	PUT Edita el post postid
## /topics/[topicid]/posts/[postid]/comments
	**GET**: Devuelve la lista de comentarios del post
	**POST**: Crea un nuevo comentario en el post postid
## /topics/[topicid]/posts/[postid]/comments/[commentid]
	**GET**: Devuelve los datos del comentario commentid
	PUT Edita el comentario commentid
## /users
	**GET**: Devuelve la lista de usuarios
	**POST**: Crea un nuevo usuario
## /users/[userid]
	**GET**: Devuelve los datos del usuario userid
	PUT Edita los datos del usuario userid
	DELETE Elimina al usuario userid
## /categories
	**GET**: Devuelve la lista de categorias existentes
	**POST**: Crea una nueva categoría
## /categories/[categoryid]
	**GET**: Devuelve los datos de la categoria categoryid