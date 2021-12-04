var userFormEL = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoSearchTermEl = document.querySelector("#repo-search-term");
var reposContainerEl = document.querySelector("#repos-container");


var getUserRepos = function(user){
    // format the github api url
    var apiUrl= "https:api.github.com/users/" + user + "/repos";

    // Make a request to the url
    fetch(apiUrl).then(function(response){
        if (response.ok){
        response.json().then(function(data){
            displayRepos(data, user);
             });
        } else {
            alert("Error: Github user not found");
        }
    });
};



var displayRepos = function (repos,searchTerm){
    console.log(repos); 
    console.log(searchTerm);
    reposContainerEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm;

    for (var i =0; i<repos.length; i++ ){
        // format the data into readable format on page
        if (repos[i].length === 0){
            reposContainerEl.textContent = "No repositories found.";
            return;
        }

        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // containter for each repo line 
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        
        var titleEl = document.createElement("span");
        titleEl.textContent= repoName;

        repoEl.appendChild(titleEl);

        

        reposContainerEl.appendChild(repoEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
             statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);
    }


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



