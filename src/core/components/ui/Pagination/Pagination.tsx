/*
 * ========================================
 * PAGINATION COMPONENT
 * ========================================
 */

import { forwardRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { PaginationProps } from './types';
import { Button } from '../Button';
import { Select } from '../Input';

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      className = '',
      showFirstLast = true,
      showPrevNext = true,
      showPageNumbers = true,
      showPageSize = false,
      pageSize = 10,
      pageSizeOptions = [10, 25, 50, 100],
      onPageSizeChange,
      totalItems = 0,
      label,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    // ===== Generate page numbers =====
    const pageNumbers = useMemo(() => {
      const pages: (number | string)[] = [];
      const delta = 2;

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);

        let start = Math.max(2, currentPage - delta);
        let end = Math.min(totalPages - 1, currentPage + delta);

        if (currentPage - delta <= 2) {
          start = 2;
          end = 5;
        }
        if (currentPage + delta >= totalPages - 1) {
          start = totalPages - 4;
          end = totalPages - 1;
        }

        if (start > 2) {
          pages.push('...');
        }

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (end < totalPages - 1) {
          pages.push('...');
        }

        pages.push(totalPages);
      }

      return pages;
    }, [currentPage, totalPages]);

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    };

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.5rem 0',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {/* ===== Info ===== */}
        <div
          style={{
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text-secondary, #475569)',
          }}
        >
          {label || (
            <>
              {startItem} - {endItem} {isRTL ? 'من' : 'of'} {totalItems}
            </>
          )}
        </div>

        {/* ===== Controls ===== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          {/* First */}
          {showFirstLast && (
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => goToPage(1)}
              aria-label={isRTL ? 'الصفحة الأولى' : 'First page'}
            >
              {isRTL ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            </Button>
          )}

          {/* Previous */}
          {showPrevNext && (
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label={isRTL ? 'الصفحة السابقة' : 'Previous page'}
            >
              {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          )}

          {/* Page Numbers */}
          {showPageNumbers &&
            pageNumbers.map((page, index) => (
              <Button
                key={index}
                size="sm"
                variant={page === currentPage ? 'primary' : 'ghost'}
                onClick={() => typeof page === 'number' && goToPage(page)}
                disabled={page === '...'}
                style={{
                  minWidth: '36px',
                  justifyContent: 'center',
                  ...(page === '...' && {
                    cursor: 'default',
                    opacity: 0.5,
                  }),
                }}
              >
                {page}
              </Button>
            ))}

          {/* Next */}
          {showPrevNext && (
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label={isRTL ? 'الصفحة التالية' : 'Next page'}
            >
              {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </Button>
          )}

          {/* Last */}
          {showFirstLast && (
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(totalPages)}
              aria-label={isRTL ? 'الصفحة الأخيرة' : 'Last page'}
            >
              {isRTL ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
            </Button>
          )}
        </div>

        {/* ===== Page Size ===== */}
        {showPageSize && onPageSizeChange && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: 'var(--font-size-sm, 14px)',
              color: 'var(--color-text-secondary, #475569)',
            }}
          >
            <span>{isRTL ? 'عرض' : 'Show'}</span>
            <Select
              value={String(pageSize)}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              options={pageSizeOptions.map((size) => ({
                value: String(size),
                label: String(size),
              }))}
              size="sm"
              style={{ width: '80px' }}
            />
            <span>{isRTL ? 'عنصر' : 'items'}</span>
          </div>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;