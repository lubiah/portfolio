const spy = (container: HTMLElement) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const ID = entry.target.id;
				if (entry.isIntersecting) {
					document.querySelectorAll('.toc-link').forEach((i) => i.classList.remove('active'));
					document
						.querySelector('.toc')
						?.querySelector(`a[href='#${ID}']`)
						?.classList.add('active');
				}
			});
		},
		{
			rootMargin: '0px 0px -80% 0px'
		}
	);

	container.querySelectorAll('h2,h3,h4,h5,h6').forEach((heading) => {
		observer.observe(heading);
	});

	return () => {
		observer.disconnect();
		console.log('Destroyed');
		// TODO: Test this code after adding a navbar
	};
};
export default spy;
