window.addEventListener(`pageLoading`, () => {
	/*
		Add the header in pages without it
	*/
	if (window.location.href.includes(`TechnicalSupport`) ||
		window.location.href.includes(`Payments`)) {
		let headerElement = document.createElement(`header`);
		headerElement.innerHTML += `
			<div class="header-second">
				<div class="header-second-inner animated headroom--top headroom--not-bottom">
					<div class="container">
						<div class="row">
							<div class="col-sm-7">
								<ul class="header-second-menu hidden-xs">
									<li class="header-second-menu-item  item-home  ">
										<a class="onclick-spinner" href="/Family/Home">
											Sākums
										</a>
									</li>
									<li class="header-second-menu-item  item-journal  ">
										<a class="onclick-spinner" href="/Family/Diary">
											Dienasgrāmata
										</a>
									</li>
									<li class="header-second-menu-item  item-links item-messages ">
										<a href="/SPA/Family#/mail">
											Saziņa
										</a>
									</li>
									<li class="header-second-menu-item  item-links item-analytics ">
										<a href="/Family/ReportMarkRatings/Get">
											Pārskati
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>`;

		document.body.insertBefore(headerElement, document.body.children[0]);
	}

	// Add the videocall tab
	if (document.querySelector(`.header-second .header-second-menu`) !== null) {
		let header = document.querySelector(`.header-second .header-second-menu`);

		let element = document.createElement(`li`);
		element.className = `header-second-menu-item item-video`;
		element.innerHTML = `<a href="/SPA/Family#/video-communication/all" class="onclick-spinner">Video saziņa</a>`;

		header.insertBefore(element, header.children[3]);
	}

	// Add the tooltips
	for (let element of document.querySelectorAll(`li.header-second-menu-item`)) {
		let tabText = element.querySelector(`a`).innerText;

		let tabName;
		if (tabText === `Saziņa`) {
			tabName = `Pasts`;
		} else {
			tabName = tabText;
		}
		
		element.innerHTML += `
			<div class="header-menu-item-tooltip">
				<div class="header-menu-item-tooltip-content">
					<p>${tabName}</p>
				</div>
			</div>`;
	}

	// Add animations for tooltips
	for (let element of document.querySelectorAll(`li.header-second-menu-item a`)) {
		let tooltip = element.parentElement.querySelector(`.header-menu-item-tooltip`);

		element.addEventListener(`mouseenter`, () => {
			tooltip.style.display = `block`;

			setTimeout(() => {
				tooltip.style.marginTop = `5px`;
				tooltip.style.opacity = `1`;
			}, 50);
		});
		element.addEventListener(`mouseleave`, () => {
			setTimeout(() => {
				tooltip.style.marginTop = `20px`;
				tooltip.style.opacity = `0`;
			}, 50);

			setTimeout(() => {
				tooltip.style.display = `none`;
			}, 250);
		})
	}

	// Add the logo
	if (document.querySelector(`.header-second .header-second-inner`) !== null) {
		chrome.storage.sync.get(`theme`, (res) => {
			let logoTheme = res.theme.name === `dark` ? `dark` : `light`;
			if (isAHolidayToday()) {
				logoTheme = `dark`;
			}

			fetch(chrome.runtime.getURL(`res/title-${logoTheme}.png`))
				.then(response => response.blob())
				.then(blob => {
					var reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onloadend = () => {
						let logoElement = document.createElement(`img`);
						logoElement.className = `header-logo`;
						logoElement.src = reader.result;

						document.querySelector(`.header-second .header-second-inner`).appendChild(logoElement);
					}
				}
			);
		});
	}

	// Add the account popup
	let isAccountPopupOpen = false;
	if (document.querySelector(`.header-second .header-second-inner`) !== null) {
		let accountPopupElement = document.createElement(`div`);
		accountPopupElement.className = `header-account-popup`;

		accountPopupElement.innerHTML = `
			<div class="header-account-popup-section main">
				<div class="header-account-popup-button settings">
					<p>Iestatījumi</p>
				</div>
				<div class="header-account-popup-button help">
					<p>Palīdzība</p>
				</div>
				<div class="header-account-popup-button family-plan">
					<p>Ģimenes komplekts</p>
				</div>
				<div class="header-account-popup-button exit">
					<p>Iziet</p>
				</div>
			</div>
			<div class="header-account-popup-section settings">
				<div class="header-account-popup-button back">
					<p>Atpakaļ</p>
				</div>
				<div class="header-account-popup-button settings family-settings">
					<p>Ģimenes uzstādījumi</p>
				</div>
				<div class="header-account-popup-button settings action-history">
					<p>Darbību vēsture</p>
				</div>
				<div class="header-account-popup-button settings notification-history">
					<p>Ziņojumu vēsture</p>
				</div>
			</div>
			<div class="header-account-popup-section help">
				<div class="header-account-popup-button back">
					<p>Atpakaļ</p>
				</div>
				<div class="header-account-popup-button faq">
					<p>Biežāk uzdotie jautājumi</p>
				</div>
				<div class="header-account-popup-button tech-support">
					<p>Tehniskais atbalsts</p>
				</div>
				<div class="header-account-popup-button show-tour">
					<p>Tūre</p>
				</div>
			</div>`;

		document.querySelector(`.header-second .header-second-inner`).appendChild(accountPopupElement);

		// Add the event listeners
		document.querySelector(`.header-account-popup-button.settings`).addEventListener(`click`, () => {
			document.querySelector(`.header-account-popup-section.main`).style.left = `-300px`;
			document.querySelector(`.header-account-popup-section.settings`).style.left = `0`;
		});
		document.querySelector(`.header-account-popup-button.help`).addEventListener(`click`, () => {
			document.querySelector(`.header-account-popup-section.main`).style.left = `-300px`;
			document.querySelector(`.header-account-popup-section.help`).style.left = `0`;
		});
		document.querySelector(`.header-account-popup-button.family-plan`).addEventListener(`click`, () => {
			window.location.href = `https://my.e-klase.lv/Family/FamilyPlanInformation`;
		});
		document.querySelector(`.header-account-popup-button.exit`).addEventListener(`click`, () => {
			window.location.href = `https://my.e-klase.lv/LogOut`;
		});
		for (let element of document.querySelectorAll(`.header-account-popup-button.back`)) {
			element.addEventListener(`click`, () => {
				document.querySelector(`.header-account-popup-section.main`).style.left = `0`;
				document.querySelector(`.header-account-popup-section.settings`).style.left = `300px`;
				document.querySelector(`.header-account-popup-section.help`).style.left = `300px`;
			});
		}
		document.querySelector(`.header-account-popup-button.family-settings`).addEventListener(`click`, () => {
			window.location.href = `https://my.e-klase.lv/Family/Settings/Profiles`;
		});
		document.querySelector(`.header-account-popup-button.action-history`).addEventListener(`click`, () => {
			window.location.href = `https://my.e-klase.lv/Family/ActionLog`;
		});
		document.querySelector(`.header-account-popup-button.notification-history`).addEventListener(`click`, () => {
			window.location.href = `https://my.e-klase.lv/Family/MessageLog`;
		});
		document.querySelector(`.header-account-popup-button.faq`).addEventListener(`click`, () => {
			window.location.href = `https://my.e-klase.lv/Family/FAQ/Student`;
		});
		document.querySelector(`.header-account-popup-button.tech-support`).addEventListener(`click`, () => {
			window.location.href = `https://my.e-klase.lv/Family/TechnicalSupport`;
		});
		document.querySelector(`.header-account-popup-button.show-tour`).addEventListener(`click`, () => {
			alert(`E-klases Palīgam vēl nav pieejama tūre!`);
		});
	}

	// Add the account popup button
	if (document.querySelector(`.header-second .header-second-inner`) !== null) {
		let accountPopupButtonElement = document.createElement(`div`);
		accountPopupButtonElement.className = `header-account-btn`;

		document.querySelector(`.header-second .header-second-inner`).appendChild(accountPopupButtonElement);

		let accountPopupElement = document.querySelector(`.header-account-popup`);

		accountPopupButtonElement.addEventListener(`click`, () => {
			if (isAccountPopupOpen) {
				isAccountPopupOpen = false;
				accountPopupButtonElement.className = `header-account-btn`;

				accountPopupElement.style.top = `94px`;
				accountPopupElement.style.opacity = `0`;
				setTimeout(() => {
					accountPopupElement.style.display = `none`;
				}, 200);
			} else {
				isAccountPopupOpen = true;
				accountPopupButtonElement.className = `header-account-btn active`;

				accountPopupElement.style.display = `block`;
				setTimeout(() => {
					accountPopupElement.style.top = `74px`;
					accountPopupElement.style.opacity = `1`;
				}, 50);
			}
		});
	}

	// Make the popup disappear when clicking outside of it
	document.body.addEventListener(`click`, (event) => {
		if (isAccountPopupOpen) {

			if (event.target !== document.querySelector(`.header-account-btn`) &&
				event.target !== document.querySelector(`.header-account-popup`) &&
				event.target.parentElement !== document.querySelector(`.header-account-popup`) &&
				event.target.parentElement.parentElement !== document.querySelector(`.header-account-popup`) &&
				event.target.parentElement.parentElement.parentElement !== document.querySelector(`.header-account-popup`)) {
				
				let accountPopupButtonElement = document.querySelector(`.header-account-btn`);
				let accountPopupElement = document.querySelector(`.header-account-popup`);

				isAccountPopupOpen = false;
				accountPopupButtonElement.className = `header-account-btn`;

				accountPopupElement.style.top = `94px`;
				accountPopupElement.style.opacity = `0`;
				setTimeout(() => {
					accountPopupElement.style.display = `none`;
				}, 200);
			}
		}
	});

	// Remove the titles for the links
	for (element of document.querySelectorAll(`.header-second-menu .header-second-menu-item a`)) {
		// Retain the notification count
		let notificationCount = 0;
		if (element.querySelector(`.notifications-count`) !== null) {
			notificationCount = parseInt(element.querySelector(`.notifications-count`).innerText);
		}
		
		if (notificationCount > 0) {
			element.innerHTML = `<span class="notifications-count">${notificationCount}</span>`
		} else {
			element.innerHTML = ``;
		}
	}

	// Remove the student selector & first header
	if (document.querySelector(`.header-second .col-sm-4.col-sm-offset-1`) !== null) {
		let element = document.querySelector(`.header-second .col-sm-4.col-sm-offset-1`);
		element.parentElement.removeChild(element);
	}
	if (document.querySelector(`.content-wrap .header-first`)) {
		let element = document.querySelector(`.content-wrap .header-first`);
		element.parentElement.removeChild(element);
	}

	// Show the loading spinner when clicking any header button
	for (element of document.querySelectorAll(`li.header-second-menu-item a`)) {
		element.className = `onclick-spinner`;
	}
});

const showActivePageLinks = () => {
	// Show header links as active when in some pages
	if (document.location.href.includes(`/SPA/Family#/mail`)) {
		document.querySelector(`.header-second-menu-item.item-messages`).className += ` active`;
	} else {
		document.querySelector(`.header-second-menu-item.item-messages`).className = `header-second-menu-item item-messages`;
	}
	if (document.location.href.includes(`/SPA/Family#/video-communication`)) {
		document.querySelector(`.header-second-menu-item.item-video`).className += ` active`;
	} else {
		document.querySelector(`.header-second-menu-item.item-video`).className = `header-second-menu-item item-video`;
	}
}
window.addEventListener(`urlChanged`, () => {
	showActivePageLinks();
});
window.addEventListener(`pageLoaded`, () => {
	showActivePageLinks();
});