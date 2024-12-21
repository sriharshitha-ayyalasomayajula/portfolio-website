/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

	


})
// Function to load and render projects
document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.querySelector('.project-list'); // Container for projects
    const categoryButtons = document.querySelectorAll('.category-button'); // Buttons for filtering

    // Function to render projects dynamically
    const renderProjects = (filteredProjects) => {
        projectList.innerHTML = ''; // Clear the project list before rendering
        filteredProjects.forEach(project => {
            const projectCard = `
                <div class="project-card">
                    <img src="${project.image}" alt="${project.title}" />
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.github_link}" target="_blank">GitHub</a>
                </div>
            `;
            projectList.innerHTML += projectCard;
        });
    };

    // Fetch projects from the JSON file
    fetch('assets/js/projects.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.projects;

            // Initially render all projects
            renderProjects(projects);

            // Add event listeners for category buttons
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    if (category === 'all') {
                        // Show all projects
                        renderProjects(projects);
                    } else {
                        // Filter projects based on the selected category
                        const filteredProjects = projects.filter(project =>
                            Array.isArray(project.category)
                                ? project.category.includes(category)
                                : project.category === category
                        );
                        renderProjects(filteredProjects);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});