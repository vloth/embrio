import React, {useState} from 'react'
import {Button, KIND, SHAPE} from 'baseui/button'
import {useStyletron} from 'baseui'
import {
  Unstable_Grid as Grid,
  Unstable_Cell as Cell,
  BEHAVIOR
} from 'baseui/layout-grid'
import {Search} from 'baseui/icon'
// import {Input, SIZE} from 'baseui/input'
// import {CSSTransition} from 'react-transition-group'

import {PokemonImage} from '../components/PokemonImage'

const Index: React.FC = () => {
  const [showPokemon, setShowPokemon] = useState(false)
  return (
    <Grid behavior={BEHAVIOR.fluid}>
      <Cell span={12}>
        <Inner>
          <Cell span={3}>
            <Inner>
              <Button
                kind={KIND.minimal}
                shape={SHAPE.pill}
                onClick={() => setShowPokemon(true)}
              >
                <Search />
              </Button>
              <PokemonImage name="Pikachu" />
            </Inner>
          </Cell>
        </Inner>
      </Cell>
    </Grid>
  )
}

const Inner: React.FunctionComponent<{}> = ({
  children
}: {
  children?: React.ReactNode
}) => {
  const [css] = useStyletron()
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '.25rem'
      })}
    >
      {children}
    </div>
  )
}

export default Index
