const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require("postcss-preset-env");

const config = {
	plugins: [
		require('tailwindcss/nesting'),
		postcssPresetEnv({
			stage: 1,
			
		}),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer
	]
};

module.exports = config;
