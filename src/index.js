// The WebExtensions Storage API has actual autism, PTSD, down syndrom, depression,
// speech impediment, AIDS, HIV, ADHD, schizophrenia, trisomy 13, cancer,
// and probably at least 18 other different diseases but doctors haven't 100% confirmed that yet
browser.storage.local.get(`theme`).then((savedTheme) => {
	console.log(`savedTheme`, savedTheme)
	if (Object.keys(savedTheme).length === 0) {
		console.log(`yep`);
		browser.storage.local.set({ theme: `dark` });
	}

	initAnimations();
	applyExtensionBranding();
	applyTheme();
});