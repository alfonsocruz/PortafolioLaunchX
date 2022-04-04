const searchBtn = document.getElementById('search-btn'); // search button
const inputField = document.getElementById('name-input'); // search field input
const inputFieldError = document.getElementById('error-name-input'); // show field input error
const pokeName = document.getElementById('pokemon-name'); //name-screen
const pokeMoves = document.getElementById('pokemon-moves'); //moves
const pokePhoto = document.getElementById('main-screen'); // image screen
const aboutScreen = document.getElementById('about-screen'); // about-text screen
const height = document.getElementById('height'); // height
const weight = document.getElementById('weight'); // weight
const type = document.getElementById('type'); // type
const ps = document.getElementById('stat_1'); // stats[0]
const atk = document.getElementById('stat_2'); // stats[1]
const def = document.getElementById('stat_3'); // stats[2]
const sp_atk = document.getElementById('stat_4'); // stats[3]
const sp_def = document.getElementById('stat_5'); // stats[4]
const speed = document.getElementById('stat_6'); // stats[5]


const setDefault = (url) => {
	pokePhoto.style.backgroundImage = `url('assets/img/pokeball.png')`;
	pokeName.innerHTML = '';
	height.innerHTML = '';
	weight.innerHTML = '';
	pokeMoves.innerHTML = '';
	ps.innerHTML = '';
	atk.innerHTML = '';
	def.innerHTML = '';
	sp_atk.innerHTML = '';
	sp_def.innerHTML = '';
	speed.innerHTML = '';
};

const getPokemonData = (pokemon) => {
	if (pokemon === '') {
		alert('Ingrese un pokemon valido');
		return;
	}

	pokemon = pokemon.toLowerCase();

	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then((res) => {
			if (res.status != '200') {
				setDefault();
			} else {
				return res.json();
			}
		})
		.then((data) => {
			if (data) {
				let id = ('00' + data.id).slice(-3);
				let h = data.height / 10;
				let w = data.weight / 10;

				pokePhoto.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
				pokeName.innerHTML = `#${id}-${data.name}`;
				height.innerHTML = `Height: ${h} M`;
				weight.innerHTML = `Weight: ${w} KG`;
				let moves = '';
				for (const move of data.moves) {
					moves += `${move.move.name} <br />`;
				}
				pokeMoves.innerHTML = moves;
				type.innerHTML = data.types[0].type.name;
				ps.innerHTML = data.stats[0].base_stat;
				atk.innerHTML = data.stats[1].base_stat;
				def.innerHTML = data.stats[2].base_stat;
				sp_atk.innerHTML = data.stats[3].base_stat;
				sp_def.innerHTML = data.stats[4].base_stat;
				speed.innerHTML = data.stats[5].base_stat;

				inputField.value = '';
			} else {
				setDefault();
			}
		})
		.catch((error) => {
			setDefault();
		});
};

inputField.addEventListener('keydown', (event) => event.key === 'Enter' && searchBtn.click());
searchBtn.addEventListener('click', () => getPokemonData(inputField.value));