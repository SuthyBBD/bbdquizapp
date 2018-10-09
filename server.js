const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/bbdquiz'));

app.listen(process.env.PORT || 3000);
console.log('app deployed');

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})
app.get('/quiz', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})
app.get('/welcome', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})

app.get('/get-quiz', function (req, res) {
  res.status(200).json(
    [
    {
        "quizId": "1",
        "questions": [
          {
            "answer": "Apple",
            "question": "Which company manufactures the Iphone?",
            "options":
              [
                "Samsung",
                "Apple",
                "HTC",
                "Blackberry"
              ]
          },
          {
            "answer": "11",
            "question": "How many Oscars did the Titanic movie win?",
            "options":
              [
                "3",
                "14",
                "11",
                "None"
              ]
          },
          {
            "answer": "Fidel Castro",
            "question": "Who is the dictator of Cuba?",
            "options":
              [
                "Fidel Castro",
                "Kim Jong-il",
                "Joseph Stalin",
                "Idi Amin"
              ]
          },
          {
            "answer": "Arnold Schwarzenegger",
            "question": "Which Austrian became the Governor of California?",
            "options":
              [
                "Madeleine Albright",
                "Ingeborg Bachmann",
                "Daniel Swarovski",
                "Arnold Schwarzenegger"
              ]
          },
          {
            "answer": "info.cern.ch",
            "question": "What was the world's very first website?",
            "options":
              [
                "google.com",
                "info.in2p3.fr",
                "info.cern.ch",
                "nic.nikhef.nl"
              ]
          }
        ]

    },
    {
      "quizId": "2",
      "questions": [
        {
          "answer": "Elon Musk",
          "question": "Who is the CEO of SpaceX?",
          "options":
            [
              "Elon Musk",
              "Pieter Thiel",
              "Bill Gates",
              "Jeff Bezos"
            ]
        },
        {
          "answer": "Burj khalifa",
          "question": "What is the tallest man made structure on earth?",
          "options":
            [
              "One World Trade Center",
              "Tokyo Skytree",
              "Shanghai World Financial Center ",
              "Burj khalifa"
            ]
        },
        {
          "answer": "Tokyo, Japan",
          "question": "Which is the most populated city in the world?",
          "options":
            [
              "São Paulo, Brazil",
              "Shanghai, China",
              "Tokyo, Japan",
              "Delhi, India"
            ]
        },
        {
          "answer": "3 sextillion pounds",
          "question": "How much does the ocean weigh?",
          "options":
            [
              "42 billion pounds",
              "3 sextillion pounds",
              "621 million pounds",
              "8 quintillion pounds"
            ]
        },
        {
          "answer": "The Pink Star",
          "question": "At a price of $71 million, which diamond is the most expensive ever sold?",
          "options":
            [
              "Oppenheimer Blue Diamond",
              "Graff Vivid Pink Diamond",
              "The 101",
              "The Pink Star"
            ]
        }
      ]

    }
    ]
    );
});
