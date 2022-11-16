import React from 'react';

import HelpRequestTable from "main/components/HelpRequest/HelpRequestTable";
import { helpRequestFixtures } from 'fixtures/helpRequestFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/HelpRequest/HelpRequestTable',
    component: HelpRequestTable
};

const Template = (args) => {
    return (
        <HelpRequestTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    requests: []
};

export const ThreeRequests = Template.bind({});

ThreeRequests.args = {
    requests: helpRequestFixtures.threeRequests
};

export const ThreeRequestsAsAdmin = Template.bind({});

ThreeRequestsAsAdmin.args = {
    requests: helpRequestFixtures.threeRequests,
    currentUser: currentUserFixtures.adminUser
};