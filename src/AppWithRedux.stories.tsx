import AppWithRedux from "./AppWithRedux";
import {Meta, StoryObj} from "@storybook/react";
import {Provider} from "react-redux";
import {store} from "./state/store";

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedax',
    component: AppWithRedux,
    tags: ['autodocs']
}

export default meta;


type Story = StoryObj<typeof AppWithRedux>;


export const AppWithReduxStory :Story = {
    render: () => <Provider store={store}><AppWithRedux/></Provider>
}

