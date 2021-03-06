/* This file is part of Indico.
 * Copyright (C) 2002 - 2019 European Organization for Nuclear Research (CERN).
 *
 * Indico is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * Indico is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Indico; if not, see <http://www.gnu.org/licenses/>.
 */

import _ from 'lodash';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'semantic-ui-react';
import {Translate} from 'indico/react/i18n';


const isValid = value => (+value >= 0);


// TODO: make this nicer (searching by title/id, showing titles instead of IDs)

/**
 * A field that lets the user enter category IDs.
 */
const CategoryList = (props) => {
    const {value, disabled, onChange, onFocus, onBlur} = props;
    const [options, setOptions] = useState(value.map(x => ({text: x, value: x})));

    const handleAddItem = (e, {value: newValue}) => {
        if (isValid(newValue)) {
            setOptions([...options, {text: newValue, value: +newValue}]);
        }
    };

    const handleChange = (e, {value: newValue}) => {
        newValue = _.uniq(newValue.filter(isValid).map(x => +x));
        setOptions(newValue.map(x => ({text: x, value: x})));
        onChange(newValue);
        onFocus();
        onBlur();
    };

    return (
        <Dropdown options={options}
                  value={value}
                  disabled={disabled}
                  searchInput={{onFocus, onBlur, pattern: '^\\d+$'}}
                  search selection multiple allowAdditions fluid closeOnChange
                  noResultsMessage={Translate.string('Please enter a category ID')}
                  placeholder={Translate.string('Please enter a category ID')}
                  additionLabel={Translate.string('Add category') + ' #'} // eslint-disable-line prefer-template
                  onAddItem={handleAddItem}
                  onChange={handleChange} />
    );
};

CategoryList.propTypes = {
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};


export default React.memo(CategoryList);
