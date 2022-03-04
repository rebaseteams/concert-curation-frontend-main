/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { AdvancedSearchProps, CategoryObject, ValueObject } from './types';

const AdvancedSearch = ({
  filterOptions,
}: AdvancedSearchProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<Array<any>>([]);
  const [category, setCategory] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');

  const renderItem = (title: string, type: string) => ({
    value: `${type}-${title}`,
    label: <>{title}</>,
  });

  const decryptValue = (value: string): ValueObject => {
    const arr = value.split('-');
    return {
      type: arr[0],
      value: arr[1],
    };
  };

  const metaData = [
    {
      type: 'category',
      label: "I'm looking for",
    },
    {
      type: 'subcategory',
      label: 'Narrow your search',
    },
    {
      type: 'recent-searches',
      label: 'Recent Searches',
    },
    {
      type: 'results',
      label: 'fetched results',
    },

  ];

  const getMetaOptions = (sc: Array<string>) => metaData.map((i) => {
    if (i.type === 'category') {
      return {
        type: i.type,
        label: <div>{i.label}</div>,
        options: filterOptions.map((c) => renderItem(c.category, i.type)),
      };
    }
    if (i.type === 'subcategory') {
      return {
        type: i.type,
        label: <div>{i.label}</div>,
        options: sc.map((s) => renderItem(s, i.type)),
      };
    }
    return {
      type: i.type,
      label: <div>{i.label}</div>,
      options: [],
    };
  });

  const setSelectOptions = (type: string, subcatgs: Array<string>) => {
    const op = getMetaOptions(subcatgs);
    const fil = op.filter((i) => i.type === type || i.type === 'recent-searches');
    setOptions(fil);
  };

  const handleChange = (value: Array<string>) => {
    const valueArray = value.map((v) => decryptValue(v));

    const hasCategory = !!valueArray.find((i) => i.type === 'category');
    const hasSubcategory = !!valueArray.find((i) => i.type === 'subcategory');
    const hasRecentsearches = !!valueArray.find((i) => i.type === 'recent-searches');
    const hasResults = !!valueArray.find((i) => i.type === 'results');

    if (hasCategory) {
      const vo = valueArray.find((i) => i.type === 'category') as ValueObject;
      const val = vo.value;
      setCategory(val);
      const catObj = filterOptions.find((c) => c.category === val) as CategoryObject;
      const subCatgs = catObj.subcategories;
      if (subCatgs) {
        setSelectOptions('subcategory', subCatgs);
      } else {
        setSelectOptions('', []);
      }
    } else {
      setSelectOptions('category', []);
    }

    if (hasSubcategory) {
      setSelectOptions('', []);
      const subCtgObj = valueArray.find((i) => i.type === 'subcategory') as ValueObject;
      setSubcategory(subCtgObj.value);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      const defaultSearch = {
        value: `results-${value}`,
        label: <>{value}</>,
      };
      setOptions([defaultSearch]);
    } else {
      setSelectOptions('category', []);
    }
  };

  const handleClear = () => {
    setSelectOptions('category', []);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`${category}-${subcategory}-${searchQuery}`);
  }, [searchQuery]);

  useEffect(() => {
    setSelectOptions('category', []);
  }, []);

  return (

    <Select
      mode="multiple"
      allowClear
      style={{
        background: '#444',
        color: '#FFF',
        width: 354,
        marginRight: '70px',
      }}
      options={options}
      onChange={handleChange}
      onSearch={handleSearch}
      onClear={handleClear}
    />

  );
};

export default AdvancedSearch;
