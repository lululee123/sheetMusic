import React from 'react';
import { STORY_RENDERED } from '@storybook/core-events';
import addons, { types } from '@storybook/addons';

const ADDON_ID = 'redux';
const PANEL_ID = `${ADDON_ID}/panel`;

class ReduxPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}

	componentDidMount() {
		const { api } = this.props;

		api.on('redux/wrapper', this.onStoryUpdate);
		api.on(STORY_RENDERED, this.onStoryChange);
	}

	componentWillUnmount() {
		const { api } = this.props;

		api.off('redux/wrapper', this.onStoryUpdate);
		api.off(STORY_RENDERED, this.onStoryChange);
	}

	onStoryUpdate = params => {
		if (params && !params.disable) {
			const value = params.data;
			this.setState({ value });
		} else {
			this.setState({ value: undefined });
		}
	};

	onStoryChange = id => {
		const { api } = this.props;
		const params = api.getParameters(id, 'redux');

		this.onStoryUpdate(params);
	};

	render() {
		const { value } = this.state;
		const { active } = this.props;
		return active ? (
			<div style={{ whiteSpace: 'pre' }}>{JSON.stringify(value, null, '\t')}</div>
		) : null;
	}
}

addons.register(ADDON_ID, api => {
	const render = ({ active }) => <ReduxPanel key={PANEL_ID} api={api} active={active} />;
	const title = 'Redux';

	addons.add(PANEL_ID, {
		type: types.PANEL,
		title,
		render,
	});
});
