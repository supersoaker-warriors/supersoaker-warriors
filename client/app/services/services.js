// services.js
// contains factories, with two main purposes:
// a UserService factory that stores things about the user's session (username, firebasepointers)
// use factories or services? idc to be honest.
//TODO: figure out whether to use factories or services

angular.module('okdoodle.services', [])

.factory('UserService', function($http) {

  return {
    // on signin i want to get
    // get: function() {
    //   return $http.get('/api/login')//api user info
    // },

    post: function(data) { //data
      return $http({
        method: 'POST',
        url: '/api/login',
        data: JSON.stringify(data)
      })
      .then(function(resp) {
        console.log(resp);
      });
    },
    postNew: function(data) {
      return $http({
        method: 'POST',
        url: '/api/new',
        data: JSON.stringify(data)
      })
      .then(function(resp) {
        console.log(resp);
      });
    }
  }
})

//   .factory('UserService', function ()/*TODO: does this 'require' anything? does it need to be required? */ {
//   // this factory holds USER object and shares it between scopes.

//   // the "test" variable will make some dummy data and instantiate it's own firebases
//   // if we are testing. This can also be referenced from other factories
//   var test = true;

//   var user = {};
//   // the "pics" object will store firebase urls pointing to
//   user.pics = {};

//   if(test){
//     user.username = "Danky McThemes";
//     // PSEUDO user.pics.profile = new firebase blah blah
//   }
//   // with props like: username, firebase url pointers to pics that can be dummied for now, but should really
//   // be initialized with an object input from the server.

//   return {user: user,
//           test: test
//   };

// })

//TODO: find out if the second factory acts as a subfactory of the first (not ideal), or is the same as calling:
//angular
// .module('okdoodle') again.
.factory('AjaxService', function ($http){
   //this is to handle any GET and POST requests
   // this will also handle the firebase update logic (which are simplified "get" and "posts")
})


// app.post('/api/new', function (req, res) {
//   console.log("post request received");
//   console.log("body:",  req.body);
//   res.send('post worked');
//   var newUser = db({
//       username: req.body.username,
//       first: req.body.first,
//       last: req.body.last,
//       email: req.body.email,
//       password: req.body.password,
//       age: req.body.age,
//       description: req.body.description
//   })
//   newUser.save(function (err, userObj) {
//     if (err) {
//       console.log("error creating user: ", err);
//       res.send('user saved successfully');
//     }
//     else {
//       console.log('user saved successfully: ', userObj);
//     }

//   })
// });

// app.post('/api/update', function (req, res) {
//   console.log(req.body);
//   //updates will contain all fields, including doogles, that we want to change
//   var updates = req.body.updates;
//   console.log("updates: ", updates);
//   // query is the criteria to find user we want to update
//   var query = { username: req.body.username };

//   //find the actual user
//   db.findOne(query, function (err, user) {
//     if (err) {
//       console.log(err);
//     }
//     // store what is updated to be sent in a response message
//     var sendMsg = ['updated: '];
//     console.log("updates: ", updates);

//     for (var key in updates) {


//       // if key is not undefined, we want to change it
//       if (updates[key] !== undefined) {
//         if (key !== 'doodles') {
//           user[key] = updates[key];
//           console.log("key: ", key, updates[key]);
//           sendMsg.push(key);
//         }
//         // handle doodles a bit differently...
//         else if (key === 'doodles') {
//           sendMsg.push('doodles');
//           // since we have multiple doodles...
//           for (var doogle in doodles) {
//             // first, handle deletions:
//             for (var key in doodle[deletions]) {
//               delete user.doodleArray[doodle][key];
//             }
//             for (var key in doodle[additions]) {
//               user.doodleArray[doodle][key] = doodle[additions][key];
//             }

//           }
//         }
//       }
//     }
//     sendMsg = sendMsg.join(' ');
//     console.log(user);
//     res.send(user, sendMsg);
//     user.save(function (err, user) {
//       if (err) {
//         console.log(err);
//       }
//       console.log('saved successfully!!!!:', user);
//     })

//    })
// });

// pp.post('/api/login', function (req, res) {
//   var username = req.body.username;
//   var password = req.body.password;
//   db.find({
//           username: username
//           },
//     function (err, user) {
//       if (err) {
//         console.log(err);
//       }
//       else if (Object.keys(user).length === 0) {
//         res.send("User doesn't exist!");
//       }
//       else if (user.password !== password) {
//         res.send("Password is incorrect!")
//       }
//       else {
//         res.json(user);
//       }
//     })
// })

// app.use(express.static(__dirname+ '/../Public'));

// var server = app.listen(PORT, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("Server listening at http://%s:%s", host, port);



// });

