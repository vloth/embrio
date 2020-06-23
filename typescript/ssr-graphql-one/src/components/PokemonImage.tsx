import React from 'react'
import {useGraphQL} from 'graphql-react'
import {pokemonFetchOptionsOverride} from '../../config'

export const PokemonImage = ({name}: {name: string}) => {
  const {loading, cacheValue: {data} = {data: null}} = useGraphQL({
    fetchOptionsOverride: pokemonFetchOptionsOverride,
    operation: {
      query: /* GraphQL */ `
        {
          pokemon(name: "${name}") {
            image
          }
        }
      `
    },
    loadOnMount: true,
    loadOnReload: true,
    loadOnReset: true
  })

  return (
    <>
      {data && <img src={data.pokemon.image} alt={name} />}
      {loading && <p>Loading...</p>}
    </>
  )
}
