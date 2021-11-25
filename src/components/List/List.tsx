import React, { useEffect, useState } from 'react';
import './List.scss';

type dirStrs = 'desc' | 'asc';

type ListProps = {
    data: any[]; 
    filterType: string;
    sortOptions: Array<string>,
    editEntry: (x: any) => void
    deleteEntry: (x: string) => void,
    addEntry: () => void
}

interface ISortParams {
    type: string,
    direction: dirStrs
}

const List = ({ 
    data, 
    filterType, 
    sortOptions,
    addEntry,
    editEntry,
    deleteEntry
}: ListProps) => {
    const [filters, setFilters] = useState<Array<string> | undefined>(undefined);
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);
    const [sortParams, setSortParams] = useState<ISortParams | undefined>(undefined);
    const [sortDirs] = useState<Array<dirStrs>>(['desc', 'asc']);

    useEffect(() => {

        const getFilterList = () => {
            const filterBatch = data
                .map((dataObj: {[x: string]: string}) => dataObj[filterType])
                .filter((filterVal, index, self) => self.indexOf(filterVal) === index);

            setFilters(['ALL', ...filterBatch]);
            setSelectedFilter('ALL');
        }

        const prepareSortParams = () => {
            setSortParams({
                type: sortOptions[0],
                direction: sortDirs[0]
            })
        }

        getFilterList();
        prepareSortParams();

    }, [sortDirs, data, filterType, sortOptions]);

    const renderListOption = (): JSX.Element => {

        return (
            <div id="list-options">
                <div>
                    <label>Device Type:</label>
                    <select 
                        data-testid="filter-options"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                        {
                            filters?.map(filter => (<option key={filter} value={filter}>{filter}</option>))
                        }
                    </select>
                </div>
                <div>
                    <label>Sort By:</label>
                    <select
                        value={sortParams?.type}
                        onChange={(e) => {
                            setSortParams({...sortParams, type: e.target.value} as ISortParams);
                        }}
                    >
                        {
                            sortOptions.map(sortOpt => (<option key={sortOpt} value={sortOpt}>{sortOpt}</option>))
                        }
                    </select>
                    <select
                        value={sortParams?.direction}
                        onChange={(e) => {
                            setSortParams({...sortParams, direction: e.target.value} as ISortParams);
                        }}
                    >
                        {
                            sortDirs.map(sortDir => (<option key={sortDir} value={sortDir}>{sortDir}</option>))
                        }
                    </select>
                </div>
                <div>
                    <button onClick={() => addEntry()}>Add</button>
                </div>
            </div>
        );
    }

    const renderList = (): JSX.Element => {
        const sortData = (batch: any) => batch.sort((a: any, b: any): number => {
            if(!sortParams) return 0;

            const compare = (first: any, second: any) => isNaN(first) ? first.localeCompare(second) : parseInt(first) - parseInt(second);

            if(sortParams.direction === 'asc') {
                return compare(a[sortParams.type], b[sortParams.type]);
            } else {
                return compare(b[sortParams.type], a[sortParams.type]);
            }
        });

        const dataBatch = sortParams ? sortData(data) : data;        
        const jsxEls = dataBatch
            .filter((dataObj: {[x: string]: string}) => {
                if (selectedFilter === 'ALL') return true;

                return dataObj[filterType] === selectedFilter;
            })
            .map((dataObj: {[x: string]: string}) => {
                const dataKeys = Object.keys(dataObj);

                return (
                    <li key={dataObj.id} data-testid="list-entry">
                        <div className="info">
                            {
                                dataKeys.map(key => (<p key={key}>{ dataObj[key] }</p>))
                            }
                        </div>
                        <div className="entry-menu">
                            <button className="edit" onClick={() => {
                                editEntry(dataObj);
                            }}>
                                Edit
                            </button>
                            <button className="edit" onClick={() => {
                                deleteEntry(dataObj.id);
                            }}>
                                Delete
                            </button>
                        </div>
                    </li>
                );
        });
        
        return (
            <ul>
                { jsxEls }
            </ul>
        );
    }

    return (
        <div id="list-wrap" data-testid="list">
            { renderListOption() }
            <div id="list">
                { renderList() }
            </div>
        </div>
    );
}

export default List;