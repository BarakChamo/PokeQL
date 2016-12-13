import React from 'react'

const unknownSprite = '/assets/unknown.gif'

const langs = {
  en: 'en-US',
  ja: 'ja-JP'
}

class PokemonSpeech extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name
    }

    console.log(this.props)

    if (props.name) {
      this.sayName(props.name)
    }
  }

  componentWillReceiveProps({name}) {
    if (name !== this.state.name && name) {
      this.sayName(name)
    }
  }

  sayName(name) {
    if (window.speechSynthesis) {
      let n = new SpeechSynthesisUtterance(name)
      n.lang = 'ja-JP'//langs[this.props.lang && this.props.lang.toLowerCase()] || 'en-US'
      window.speechSynthesis.speak(n)
    }
  }

  render() {
    return (<div className="hidden"></div>)
  }
}

const PokemonType = ({ name = '?', id='' }) => (<li className={`${name.toLowerCase()} type-${id}`}>{name}</li>)

const PokemonAbility = ({ name = '?', id='' }) => (<li>{name}</li>)

const PokemonEvolution = ({ trigger='?', pokemon={} }) => (
  <div className="evolution" style={{textAlign:'center'}}>
    <PokemonEvolutionPokemon {...pokemon}  />
    <span>{trigger}</span>
  </div>
)

const PokemonEvolutionPokemon = ({ name = '?', id='', sprite=unknownSprite }) => (
  <div className="evolution-pokemon">
    <span className="evolution-pokemon-name">{name}</span>
    <img src={sprite} alt="" className="evolution-pokemon-sprite"/>
  </div>
)

const Pokemon = ({ species= '?', weight= '?', height= '?', lang='en', id = '?', name = '?', sprite = unknownSprite, types = [], abilities = [], evolution = [] }) => (
  <div className='pokemon'>
    <PokemonSpeech name={name !== '?' && name} lang={lang}/>
  <div className='topBar pokemon-title'>
    <span>#{id} - </span>
    <span> &nbsp;{name}</span>
  </div>
  <div style={{height:'100%'}}>
  <div className='pokemon-preview'>
    <div className="pokemon-sprite">
      <img src={sprite}  alt="" />
    </div>
  </div>
  <div className='pokemon-stats'>
    <span>Species: {species}</span>
    <br/><br/>
    <span>Weight: </span>{weight}<small>lbs</small><span> &nbsp;Height: {height}<small>lbs</small></span>
    <br/><br/>
    <div className="pokemon-types">
      <span>Types:</span>
      <ul>
        {types.length ? types.map(t => <PokemonType {...t} />) : '???'}
      </ul>
    </div>
    <br />
    <div className="pokemon-abilities">
      <span>Abilities:</span>
      <ul>
        {abilities.length ? abilities.map(a => <PokemonAbility {...a} />) : '???'}
      </ul>
    </div>
    <br />
    <div>
      <span>Evolutions:</span>
      <div className="pokemon-evolution">
        {evolution.length ? evolution.map(e => <PokemonEvolution {...e} />) : '???'}
      </div>
    </div>
  </div>
  </div>
  </div>
)

const Item = () => (<div>Item</div>)

const Type = () => (<div>Type</div>)

const Dex = ({ data = {}, lang = 'en' }) => {
  const { trainer } = data

  if(!trainer) return (<span className='empty'>No<br/>Pokemon<br/>Found!</span>)

  const { pokemon, item, type } = trainer

  // Render a pokemon
  if (pokemon) { return (<Pokemon {...pokemon} lang={lang} />) }

  // Render item info
  if (item) { return (<Item />) }

  // Render type info
  if (type) { return (<Type />) }
}

export default props => (<div className="pokedex"><Dex {...props}/></div>)
