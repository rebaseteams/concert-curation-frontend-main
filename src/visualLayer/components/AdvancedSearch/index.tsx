/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Button,
} from 'antd';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
  AdvancedSearchProps, CategoryObject, OptionType, ValueObject,
} from './types';

import './styles.scss';
import SearchPopup from './popup';
import { metaTypes } from './utils';
import ResultRenderer from './renderer/resultRenderer';

const AdvancedSearch = ({
  filterOptions,
  onSearching,
  searchResults,
  onResultSelect,
}: AdvancedSearchProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<Array<any>>([]);
  const [category, setCategory] = useState<string>('');
  const [subcategories, setSubcategories] = useState<Array<string>>([]);
  const [subcategory, setSubcategory] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const renderItem = (title: string, type: string) => ({
    id: `${type}-${title}`,
    type,
    value: title,
    label: <>{title}</>,
  });

  const metaData = [
    {
      type: metaTypes.category,
      label: "I'm looking for...",
    },
    {
      type: metaTypes.subcategory,
      label: 'Narrow your search',
    },
    {
      type: metaTypes.recent,
      label: 'Recent Searches',
    },
    {
      type: metaTypes.results,
      label: 'fetched results',
    },

  ];

  const getMetaOptions = (sc: Array<string>) => metaData.map((i) => {
    if (i.type === metaTypes.category) {
      return {
        type: i.type,
        label: i.label,
        viewOption: 'grid',
        options: filterOptions.map((c) => renderItem(c.category, i.type)),
      };
    }
    if (i.type === metaTypes.subcategory) {
      return {
        type: i.type,
        label: i.label,
        options: sc.map((s) => renderItem(s, i.type)),
      };
    }
    if (i.type === metaTypes.recent) {
      return {
        type: i.type,
        label: i.label,
        options: [renderItem('recent1', i.type), renderItem('recent2', i.type)],
      };
    }
    return {
      type: i.type,
      label: i.label,
      options: [],
    };
  });

  const setSelectOptions = (type: string, subcatgs: Array<string>) => {
    const op = getMetaOptions(subcatgs);
    const fil = op.filter((i) => i.type === type || i.type === metaTypes.recent);
    setOptions(fil);
  };

  const onTagChange = (valueArray: Array<ValueObject>) => {
    const hasCategory = !!valueArray.find((i) => i.type === metaTypes.category);
    const hasSubcategory = !!valueArray.find((i) => i.type === metaTypes.subcategory);
    const hasRecentSearches = !!valueArray.find((i) => i.type === metaTypes.recent);
    const hasResults = !!valueArray.find((i) => i.type === metaTypes.results);

    if (hasCategory) {
      const vo = valueArray.find((i) => i.type === metaTypes.category) as ValueObject;
      const val = vo.value;
      setCategory(val);
      const catObj = filterOptions.find((c) => c.category === val) as CategoryObject;
      const subCatgs = catObj.subcategories;
      if (subCatgs) {
        setSelectOptions(metaTypes.subcategory, subCatgs);
        setSubcategories(subCatgs);
      } else {
        setSelectOptions('', []);
        setSubcategories([]);
      }
    } else {
      setSelectOptions(metaTypes.category, []);
      setCategory('');
      setSubcategories([]);
    }

    if (hasSubcategory) {
      setSelectOptions('', []);
      const subCtgObj = valueArray.find((i) => i.type === metaTypes.subcategory) as ValueObject;
      setSubcategory(subCtgObj.value);
    } else {
      setSubcategory('');
    }

    if (hasResults) {
      const resultObj = valueArray.find((i) => i.type === metaTypes.results) as ValueObject;
      if (onResultSelect) {
        onResultSelect({
          category,
          subcategory,
          query: resultObj.value,
        });
      }
      setIsSearchModalOpen(false);
      setSelectOptions(metaTypes.category, []);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearching) {
      onSearching({
        category,
        subcategory,
        query: value,
      });
    }
    if (value) {
      const defaultSearch = ResultRenderer(
        'default-value-search-id',
        value,
        metaTypes.results,
        '',
        'search for this query',
      );
      const rData = searchResults.map((sr) => ResultRenderer(
        sr.id, sr.title, metaTypes.results, sr.image, sr.description,
      ));
      rData?.unshift(defaultSearch);
      setOptions([{
        label: '',
        options: rData,
      }]);
    } else if (category && (subcategory || subcategories.length === 0)) {
      setSelectOptions('', []);
    } else if (category) {
      setSelectOptions(metaTypes.subcategory, subcategories);
    } else {
      setSelectOptions(metaTypes.category, []);
    }
  };

  useEffect(() => {
    setSelectOptions(metaTypes.category, []);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const defaultSearch = ResultRenderer(
        'default-value-search-id',
        searchQuery,
        metaTypes.results,
        '',
        'search for this query',
      );
      const rData = searchResults?.map((sr) => ResultRenderer(
        sr.id, sr.title, metaTypes.results, sr.image, sr.description,
      ));
      rData?.unshift(defaultSearch);
      setOptions([{
        label: '',
        options: rData,
      }]);
    }
  }, [searchResults]);

  return (
    <div className="advanced-search-box">
      <div className="search-button-container">
        <Button
          data-testid="search-button"
          className="search-button"
          onClick={() => setIsSearchModalOpen(true)}
        >
          <div className="search-button-internal-div">
            Search in Concert Curation
            <SearchOutlined
              data-testid="search-icon-in-search-button"
            />
          </div>

        </Button>
      </div>

      <SearchPopup
        isModalOpen={isSearchModalOpen}
        setIsModalOpen={setIsSearchModalOpen}
        options={options}
        onTagChange={onTagChange}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default AdvancedSearch;
