import React from 'react';

import DiningCommonsMenuItemTable from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemTable";
import { diningCommonsMenuItemFixtures } from 'fixtures/diningCommonsMenuItemFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/DiningCommons/DiningCommonsMenuItemTable',
    component: DiningCommonsMenuItemTable
};

const Template = (args) => {
    return (
        <DiningCommonsMenuItemTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    diningCommonsMenuItem: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    diningCommonsMenuItem: diningCommonsMenuItemFixtures.threeMenuItems
};

export const ThreeDatesAsAdmin = Template.bind({});

ThreeDatesAsAdmin.args = {
    diningCommonsMenuItem: diningCommonsFixtures.threeCommons,
    currentUser: currentUserFixtures.adminUser
};