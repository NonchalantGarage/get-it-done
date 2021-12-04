var userFormEL = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoSearchTermEl = document.querySelector("#repo-search-term");
var reposContainerEl = document.querySelector("#repos-container");


var getUserRepos = function(user){
    // format the github api url
    var apiUrl= "https:api.github.com/users/" + user + "/repos";

    // Make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayRepos(data, user);
        });
    });
};



var displayRepos = function (repos,searchTerm){
    console.log(repos); 
    console.log(searchTerm);
    reposContainerEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm;
};






var formSubmitHandler = function(event){
    event.preventDefault();
    // get value from input element
var username = nameInputEl.value.trim();

if (username){
    getUserRepos(username);
    nameInputEl.value = "";
}   else {
    alert("Please enter Github username");
} 
    console.log(event);
};

// This function will accept both the array of repository data and the term we searched for as parameters.



// var response = fetch("https://api.github.com/users/octocat/repos").then(function(response){
//     response.json().then(function(data){
//         console.log(data);
//     });
// });


userFormEL.addEventListener("submit", formSubmitHandler);   



