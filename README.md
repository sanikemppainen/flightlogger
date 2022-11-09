# Movie logger app 

### My friends said I have a bad taste in movies so i am making this app to prove them right. 

Users can browse through movies (from imdb api) and save movies they have seen onto a database (mongoDB) with their own rating. Then you can see how those movies are rated in imdb and compare how your own and the imdb reviews differ. You can also see what movies your friends have watched and what  review they have given. This way you will finally have the evidence necessary to prove that I do not like the same movies as imdb critics and thus my taste in movies is questionable :-)

#### At the moment the app has the following functionalities:
 * backend and frontend login with username and password ('Anna' 'salasana' in the db for testing purposes). Google sign in is integrated to the frontend but isn't yet connected to the app logic and session tokens thus if testing, user username+password for now
 * ability to make api calls to imdb database and backend. Imdb movies can be searched by title name and it returnes 10 of the most accurate search results
 *backend works with MongoDB and users can store and retrieve data
 *listing the movies already rated from the database on the frontend
 
 App is made with React, Node.js, express, MongoDB, Google Identity Services, axios REST api
 
 ...more to follow!
 
 
