namespace DAL.Repositories
{
    using DAL.Repositories.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Linq.Dynamic.Core;

    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext _context;
        protected readonly DbSet<TEntity> _entities;

        public Repository(DbContext context)
        {
            _context = context;
            _entities = context.Set<TEntity>();
        }

   
        public Tuple<IEnumerable<TEntity>, int> ListWithPaging(
            Expression<Func<TEntity, bool>>[] filterExpression = null,
            int startIndex = 0,
            int pageSize = 10,            
            string sortActive = "Id",
            string sortDirection = "ASC")
        {
            //var customerQuery = _appContext.Customers.AsQueryable();
            IQueryable<TEntity> query = _entities;

            foreach (var filter in filterExpression)
            {
                query = query.Where(filter);
            }           

            var count = query.Count();

            if (string.IsNullOrWhiteSpace(sortActive))
            {
                sortActive = "Id";
            }

            if (string.IsNullOrWhiteSpace(sortDirection))
            {
                sortDirection = "ASC";
            }

            if (pageSize == 0)
            {
                pageSize = 10;
            }

            var sortExpression = sortActive + " " + sortDirection;

            var customers = query.OrderBy(sortExpression).Skip(startIndex * pageSize).Take(pageSize).ToList();                        

            return new Tuple<IEnumerable<TEntity>, int>(customers, count);
        }

        public virtual void Add(TEntity entity)
        {
            _entities.Add(entity);
        }

        public virtual void AddRange(IEnumerable<TEntity> entities)
        {
            _entities.AddRange(entities);
        }


        public virtual void Update(TEntity entity)
        {
            _entities.Update(entity);
        }

        public virtual void UpdateRange(IEnumerable<TEntity> entities)
        {
            _entities.UpdateRange(entities);
        }

        public virtual void Remove(TEntity entity)
        {
            _entities.Remove(entity);
        }

        public virtual void RemoveRange(IEnumerable<TEntity> entities)
        {
            _entities.RemoveRange(entities);
        }


        public virtual int Count()
        {
            return _entities.Count();
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return _entities.Where(predicate);
        }

        public virtual TEntity GetSingleOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return _entities.SingleOrDefault(predicate);
        }

        public virtual TEntity Get(int id)
        {
            return _entities.Find(id);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return _entities.ToList();
        }
    }
}
