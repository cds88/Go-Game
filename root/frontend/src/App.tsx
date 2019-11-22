
import * as React from 'react';

import { Provider } from 'react-redux'; 
 
import Master from './Master';

import { store } from "./reducers/ConfigureStore";

const App: React.FC = () => {
    return (
           <Provider store={store}>
            <Master />
           </Provider>
    )
}

export default App;
