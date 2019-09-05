let data;

console.log("TEST");

function addPhotoModals() {
    photoModals = "";
    for (let i = 0; i < data.photos.length; i++) {
        let photoModal = `
        <div class="portfolio-modal modal fade" id="portfolioModal${i + 1}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="close-modal" data-dismiss="modal">
                    <div class="lr">
                    <div class="rl"></div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="modal-body">
                        <!-- Project Details Go Here -->
                        <h2 class="text-uppercase"> ${data.photos[i].title}</h2>
                        <img class="img-fluid d-block mx-auto" src="${data.photos[i].source}" alt="">
                        <p> ${data.photos[i].caption} </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `;
        photoModals += photoModal;
    }
    document.getElementById("photomodals").innerHTML = photoModals;
}

function addTeamModals() {
    teamModals = "";
    for (let i = 0; i < data.members.length; i++) {
        let teamModal = `
        <div class="portfolio-modal modal fade" id="teamModal${i}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                    <div class="rl"></div>
                </div>
                </div>
                <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                    <div class="modal-body">
                        <!-- Project Details Go Here -->
                        <h2 class="text-uppercase">${data.members[i].name}</h2>
                        <img class="img-fluid d-block mx-auto" src="${data.members[i].picture}">
                        <p>
                        ${data.members[i].bio}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;
        teamModals += teamModal;
    }
    document.getElementById("teammodals").innerHTML = teamModals;
}

function getGridContents() {
    gridContents = `<div class="row">
        <div class="col-lg-12 text-center">
        <h2 class="section-heading text-uppercase">Meet The Team</h2>
        <h4 class="section-subheading text-muted" style="font-family: Droid Serif, Helvetica Neue">Happy Gas consists of ${data.members.length} talented improvisers.</h4>
        </br>
        </div>
    </div>`;
    gridContents += `<div class="row">`;
    for (let i = 0; i < data.members.length; i++) {
        if (i % 3 == 0 && i != 0) {
            gridContents += `</div><div class="row">`;
        }
        gridContents += `
        <div class="col-sm-4">
            <div class="team-member">
                <img class="mx-auto rounded-circle" src="${data.members[i].picture}" style="cursor: pointer" data-toggle="modal" href="#teamModal${i}">
                <h4>${data.members[i].name}</h4>
                <p class="text-muted">${data.members[i].role}</p>
            </div>
        </div>
        `;
    }
    gridContents += `</div>`;
    return gridContents;
}

function addTeamGrid() {
    let teamGridContents = getGridContents();
    let teamGrid = `<section class="bg-light">
    <div class="container">
        ${teamGridContents}
    </div>
    </section>`;
    document.getElementById('teamGrid').innerHTML = teamGrid;
}

function setOtherPhotos() {
    document.getElementById('whoAreWeImageBlock').innerHTML = `
    <img src="${data.who_are_we_photo}" class="rounded" height=70% width=70%></img>
    </br>
    </br>`;

    document.getElementById("headerBanner").innerHTML = `
    <header class="masthead" style="background-image: url('${data.header_photo}');">
        <div class="container">
        <div class="intro-text">
            <div class="intro-lead-in">Are you ready to</div>
            <div class="intro-heading text-uppercase">Smell the Funny?</div>
            <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#history">I'm interested!</a>
        </div>
        </div>
    </header>
    `;
}

function setGridPortfolios() {
    let gridPortfolioData = "";
    for(let i = 0; i < data.photos.length; i++){
        let newGridPhoto = `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${i+1}">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="${data.photos[i].source}" alt="">
            </a>
        </div>`;
        gridPortfolioData += newGridPhoto;
    }
    document.getElementById("gridPortfolios").innerHTML = gridPortfolioData;
}

$(document).ready(function () {
    $.getJSON("data.json", function (json) {
        data = json;
        populateDivs();
    });
});

function populateDivs() {
    addPhotoModals();
    addTeamModals();
    addTeamGrid();
    setGridPortfolios();
    setOtherPhotos();
}