define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/relations/add",
    "title": "API accepting the friend request",
    "name": "API_accepting_the_friend_request",
    "group": "relation",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>senderId for the acceptance of friend request. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "receiverId",
            "description": "<p>receiverId for the acceptance of friend request. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Friend request accepted successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/relation.js",
    "groupTitle": "relation"
  },
  {
    "type": "get",
    "url": "/api/v1/relations/getAll",
    "title": "API for fetching all the active friends",
    "name": "API_for_fetching_all_active_friends",
    "group": "relation",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"All active friends fetched sucessfully\",\n \"status\": 200,\n \"data\": [\n     ...\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/relation.js",
    "groupTitle": "relation"
  },
  {
    "type": "get",
    "url": "/api/v1/relations/getPending",
    "title": "API for fetching all the pending friend requests",
    "name": "API_for_fetching_all_pending_friends_requests",
    "group": "relation",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"All pending requests fetched sucessfully\",\n \"status\": 200,\n \"data\": [\n     ...\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/relation.js",
    "groupTitle": "relation"
  },
  {
    "type": "post",
    "url": "/api/v1/relations/create",
    "title": "API for sending friend request",
    "name": "API_for_sending_friend_request",
    "group": "relation",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>senderId for the friend request. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "receiverId",
            "description": "<p>receiverId for the friend request. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Friend request sent successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/relation.js",
    "groupTitle": "relation"
  },
  {
    "type": "post",
    "url": "/api/v1/relations/add",
    "title": "API rejecting the friend request",
    "name": "API_rejecting_the_friend_request",
    "group": "relation",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>senderId for the rejection of friend request. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "receiverId",
            "description": "<p>receiverId for the rejection of friend request. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Friend request rejected successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/relation.js",
    "groupTitle": "relation"
  },
  {
    "type": "post",
    "url": "/api/v1/todos/add",
    "title": "API for adding a Todo List",
    "name": "API_for_adding_a_Todo_List",
    "group": "todo",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title for the Todo to be added. (body parameters) (not required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "list",
            "description": "<p>Todolist for the Todo to be added. (body parameters) (not required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Todo updated successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todo.js",
    "groupTitle": "todo"
  },
  {
    "type": "get",
    "url": "/api/v1/todos/getById/:id",
    "title": "API for fetching Todo by Id",
    "name": "API_for_fetching_Todo_by_Id",
    "group": "todo",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Todo fetched sucessfully\",\n \"status\": 200,\n \"data\": [\n     ...\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todo.js",
    "groupTitle": "todo"
  },
  {
    "type": "get",
    "url": "/api/v1/todos/getById/:id",
    "title": "API for fetching Todo by Id",
    "name": "API_for_fetching_Todo_by_Id",
    "group": "todo",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Todo fetched sucessfully\",\n \"status\": 200,\n \"data\": [\n     ...\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todo.js",
    "groupTitle": "todo"
  },
  {
    "type": "get",
    "url": "/api/v1/todos/getAll",
    "title": "API for fetching all the active Todos",
    "name": "API_for_fetching_all_active_Todos",
    "group": "todo",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"All active Todos fetched sucessfully\",\n \"status\": 200,\n \"data\": [\n     ...\n ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todo.js",
    "groupTitle": "todo"
  },
  {
    "type": "post",
    "url": "/api/v1/todos/remove",
    "title": "API for removing all versions of Todo List",
    "name": "API_for_removing_all_versions_of_Todo_List",
    "group": "todo",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>todoId of the Todo to be deleted. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>version for the Todo to be deleted. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status for the Todo to be deleted. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parentId",
            "description": "<p>parentId for the Todo to be deleted. (body parameters) (not required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Todo deleted successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todo.js",
    "groupTitle": "todo"
  },
  {
    "type": "post",
    "url": "/api/v1/todos/update",
    "title": "API for updating a Todo List",
    "name": "API_for_updating_a_Todo_List",
    "group": "todo",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "todoId",
            "description": "<p>todoId of the Todo to be updated. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title of the Todo to be updated. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>version for the Todo to be updated. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status for the Todo to be updated. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parentId",
            "description": "<p>parentId for the Todo to be updated. (body parameters) (not required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "list",
            "description": "<p>Todolist for the Todo to be updated. (body parameters) (not required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Todo updated successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/todo.js",
    "groupTitle": "todo"
  },
  {
    "type": "post",
    "url": "/api/v1/users/delete",
    "title": "API for deleting user info",
    "name": "API_for_deleting_user_info",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId userId of the user to be deleted. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"User deleted successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "post",
    "url": "/api/v1/users/getAll",
    "title": "API for fetching all normal users ( except Admin)",
    "name": "API_for_fetching_all_normal_users___except_Admin_",
    "group": "users",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"All users fetched sucessfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "post",
    "url": "/api/v1/users/getAll",
    "title": "API for fetching all the users",
    "name": "API_for_fetching_all_users",
    "group": "users",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"All users fetched sucessfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "API for user login",
    "name": "API_for_user_login",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email for the user. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password for the user. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Login successful\",\n \"status\": 200,\n \"data\": {\n     \"authToken\" : \"erEWRTYHJFGyyuiyutyrtpokij.MNBFRcvhYG\",\n     \"userDetails\" : {\n         \"firstName\" : \"\",\n         \"lastName\" : \"\",\n         \"email\" : \"\",\n         \"password\" : \"\",\n         \"mobileNumber\": ,\n         \"userId\": \"\"\n     }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n \"error\": true,\n \"message\": \"Error occured\",\n \"status\": 500,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/api/v1/users/logout",
    "title": "API for user logout",
    "name": "API_for_user_logout",
    "group": "users",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Logged out successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "API for user password forgot",
    "name": "API_for_user_password_forgot",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email for the user. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Reset link has been sent to the email. Please reset the your password using te provided link\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "post",
    "url": "/api/v1/users/resetpassword",
    "title": "API for user password reset",
    "name": "API_for_user_password_reset",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email for the user. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"Password reset successfully\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "API for user signup",
    "name": "API_for_user_signup",
    "group": "users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>firstname for the user. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": "<p>lastname for the user. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email for the user. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password for the user. (body parameters) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile for the user. (body parameters) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error, status, message, http status code and data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"error\": false,\n \"message\": \"signup successful\",\n \"status\": 200,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n \"error\": true,\n \"message\": \"Error occured\",\n \"status\": 500,\n \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users"
  }
] });
