import { FC, ReactNode } from 'react'

type GridProps = {
    children: ReactNode
    rows: number;
};

const GridSortable: FC<GridProps> = ({ children, rows }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns:'repeat(5, 1fr)',
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridGap: 10,
                maxWidth: '600px',
                marginTop: '20px',
                position: 'relative'
            }}
        >
            {children}
        </div>
    );
};

export default GridSortable;
