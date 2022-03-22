/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
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
  const [activeOption, setActiveOption] = useState<{id: string, type: string, value: string}>();
  const [change, setChange] = useState<number>(1);

  const orderedOptionKeys = () => {
    const twoD = options.map((o) => o.options.map((i: any) => ({
      id: i.id,
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
        id: 'default-value-search-id',
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
          id: 'default-value-search-id',
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
      const previouslyActiveOptionIndex = opts.findIndex((i) => i.id === activeOption?.id);
      const activeOptionIndex = (previouslyActiveOptionIndex === opts.length - 1 || previouslyActiveOptionIndex === -1)
        ? 0
        : previouslyActiveOptionIndex + 1;
      const requestedOption = opts[activeOptionIndex];
      setActiveOption(requestedOption);
      const act = document.getElementById(`${requestedOption?.type}-${requestedOption?.value}`);
      const dv = document.getElementById('select-container-main');
      if (dv && act) {
        const parts = Math.floor(dv?.offsetHeight / act?.offsetHeight);
        // console.log('parts', parts);
        setChange((change >= parts || previouslyActiveOptionIndex === opts.length - 1) ? parts : change + 1);
        if (change === parts || previouslyActiveOptionIndex === opts.length - 1) {
          dv.scrollTop = (activeOptionIndex + 1) * act.offsetHeight - dv.offsetHeight;
        }
      }
    }
    if (e.code === 'ArrowUp') {
      const opts = orderedOptionKeys();
      const previouslyActiveOptionIndex = opts.findIndex((i) => i.id === activeOption?.id);
      const activeOptionIndex = (previouslyActiveOptionIndex === 0 || previouslyActiveOptionIndex === -1)
        ? opts.length - 1
        : previouslyActiveOptionIndex - 1;
      const requestedOption = opts[activeOptionIndex];
      setActiveOption(requestedOption);
      const act = document.getElementById(`${requestedOption?.type}-${requestedOption?.value}`);
      const dv = document.getElementById('select-container-main');
      setChange((change <= 1 || previouslyActiveOptionIndex === 0) ? 1 : change - 1);
      if (dv && act && (change === 1 || previouslyActiveOptionIndex === 0)) {
        act.scrollIntoView();
      }
    }
  };

  const handleOptionClick = (o: ValueObject) => {
    const newTags = [...selectedTags, { id: o.id, value: o.value, type: o.type }];
    setSelectedTags(newTags);
    setSearchQuery('');
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
            selectedTags.length === 0 && (
            <SearchOutlined
              data-testid="search-icon-near-input"
              className="search-icon"
            />
            )
        }
      {
          selectedTags.map((t, ind) => (
            <div
              data-testid="selected-tags-near-input"
              key={ind}
              className="tags-container"
            >

              {t.value}
              <CloseOutlined
                data-testid="selected-tags-close-icon-near-input"
                className="tags-close-icon"
                onClick={() => setSelectedTags(selectedTags.filter((i) => i.id !== t.id))}
              />
            </div>
          ))
      }

      <Input
        data-testid="search-query-input"
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
            data-testid="clear-button-near-input"
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
      <CloseOutlined
        data-testid="top-right-close-icon"
        onClick={() => setIsModalOpen(false)}
      />
    </div>
  );
  return (

    <Modal
      data-testid="search-popup-modal"
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
      <div
        className="select-container-main"
        id="select-container-main"
      >

        {
            options.map((item, index:number) => (
              <div key={index}>
                {item.label}
                <div className={item.viewOption === 'grid' ? 'grid-view-options-container' : 'list-view-options-container'}>
                  {
                    item.options.map((o: any, i: number) => (
                      <div
                        key={i}
                        className="option-button-container"
                      >
                        <Card
                          id={`${o.type}-${o.value}`}
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
                          onClick={() => handleOptionClick({ id: o.id, type: o.type, value: o.value })}
                          onMouseEnter={() => setActiveOption({
                            id: o.id,
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
