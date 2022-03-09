/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { CloseOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button, Card, Input, Modal,
} from 'antd';
import _ from 'lodash';
import {
  useEffect, useRef, useState,
} from 'react';
import { ValueObject } from '../types';
import { metaTypes } from '../utils';
import './styles.scss';

type SearchModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    options: Array<any>
    onTagChange: Function;
    handleSearch: Function;
}
const SearchPopup = ({
  isModalOpen,
  setIsModalOpen,
  options,
  onTagChange,
  handleSearch,
}: SearchModalProps): JSX.Element => {
  const searchInputRef = useRef<any>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Array<any>>([]);
  const [activeOption, setActiveOption] = useState<{type: string, value: string}>();

  const orderedOptionKeys = () => {
    const twoD = options.map((o) => o.options.map((i: any) => ({
      type: i.type,
      value: i.value,
    })));
    const oneD = _.flatten(twoD);
    return oneD;
  };

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
    if (e.target.value) {
      setActiveOption({
        type: metaTypes.results,
        value: e.target.value,
      });
    } else {
      setActiveOption(undefined);
    }
  };

  const handleKeyDown = (e: any) => {
    if (!searchQuery && e.code === 'Backspace') {
      setSelectedTags(selectedTags.slice(0, -1));
      setActiveOption(undefined);
    }
    if (searchQuery && e.code === 'Enter') {
      setSelectedTags([
        ...selectedTags,
        {
          type: metaTypes.results,
          value: searchQuery,
        },
      ]);
      setSearchQuery('');
    }
    if (activeOption && e.code === 'Enter') {
      setSelectedTags([
        ...selectedTags,
        activeOption,
      ]);
      setActiveOption(undefined);
    }
    if (e.code === 'ArrowDown') {
      const opts = orderedOptionKeys();
      if (!activeOption) {
        setActiveOption(opts[0]);
      } else {
        const activeOptionIndex = opts.findIndex((i) => `${i.type}-${i.value}` === `${activeOption.type}-${activeOption.value}`);
        setActiveOption(
          opts.length - 1 === activeOptionIndex ? opts[0] : opts[activeOptionIndex + 1],
        );
      }
    }
    if (e.code === 'ArrowUp') {
      const opts = orderedOptionKeys();
      if (!activeOption) {
        setActiveOption(opts[opts.length - 1]);
      } else {
        const activeOptionIndex = opts.findIndex((i) => `${i.type}-${i.value}` === `${activeOption.type}-${activeOption.value}`);
        setActiveOption(
          activeOptionIndex === 0 ? opts[opts.length - 1] : opts[activeOptionIndex - 1],
        );
      }
    }
  };

  const handleOptionClick = (o: ValueObject) => {
    const newTags = [...selectedTags, { value: o.value, type: o.type }];
    setSelectedTags(newTags);
    setSearchQuery('');
    // onTagChange(newTags);
  };

  useEffect(() => {
    onTagChange(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    searchInputRef?.current?.focus();
  });

  const header = (
    <div className="tags-and-input-container">
      {
            selectedTags.length === 0 && <SearchOutlined className="search-icon" />
        }
      {
          selectedTags.map((t) => (
            <div className="tags-container">

              {t.value}
              <CloseOutlined
                className="tags-close-icon"
                onClick={() => setSelectedTags(selectedTags.filter((i) => i.value !== t.value))}
              />
            </div>
          ))
      }

      <Input
        ref={searchInputRef}
        bordered={false}
        placeholder="Search for Artists, Brands, Venue locations"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {
          searchQuery
          && (
          <Button
            type="text"
            onClick={() => {
              setSearchQuery('');
              handleSearch('');
            }}
          >
            Clear
          </Button>
          )
      }
      <CloseOutlined onClick={() => setIsModalOpen(false)} />
    </div>
  );
  return (

    <Modal
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      mask={false}
      width={800}
      title={header}
      footer={null}
      closable={false}
      style={{
        position: 'relative',
        top: '5px',
      }}
    >
      <div className="select-container-main">

        {
            options.map((item) => (
              <div>
                {item.label}
                <div className={item.viewOption === 'grid' ? 'grid-view-options-container' : 'list-view-options-container'}>
                  {
                    item.options.map((o: any) => (
                      <div className="option-button-container">
                        <Card
                          className="option-button"
                          bordered={item.viewOption === 'grid'}
                          hoverable
                          bodyStyle={{ padding: '8px' }}
                          style={{
                            width: '100%',
                            backgroundColor: `${activeOption?.type}-${activeOption?.value}` === `${o.type}-${o.value}` ? '#1890ff' : '',
                            color: `${activeOption?.type}-${activeOption?.value}` === `${o.type}-${o.value}` ? '#fff' : '',
                            textAlign: 'left',
                          }}
                          onClick={() => handleOptionClick({ type: o.type, value: o.value })}
                          onMouseEnter={() => setActiveOption({
                            type: o.type,
                            value: o.value,
                          })}
                          onMouseLeave={() => setActiveOption(undefined)}
                        >
                          <div>
                            {o.type === metaTypes.subcategory && (
                              <SearchOutlined className="option-default-icon" />
                            )}
                            {o.type === metaTypes.recent && (
                              <HistoryOutlined className="option-default-icon" />
                            )}
                            {o.label}
                          </div>
                        </Card>
                      </div>
                    ))
                }
                </div>

              </div>
            ))
        }

      </div>
    </Modal>

  );
};

export default SearchPopup;
