import { DoWhite } from 'app/modules/Game/templates/DoWhite'
import { Escape } from 'app/modules/Game/templates/Escape'
import { FindColor } from 'app/modules/Game/templates/FindColor'
import { Game2048 } from 'app/modules/Game/templates/Game2048'
import { Space } from 'app/modules/Game/templates/Space'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const GamePage: React.FC = () => (
    <Switch>
        <Route exact path={['/game/find_color']} component={FindColor} />
        <Route exact path={['/game/2048']} component={Game2048} />
        <Route exact path={['/game/do_white']} component={DoWhite} />
        <Route exact path={['/game/space']} component={Space} />
        <Route exact path={['/game/escape']} component={Escape} />
    </Switch>
)
