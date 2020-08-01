package olnow.phmobile;

import org.hibernate.HibernateException;
import org.springframework.stereotype.Repository;

import javax.persistence.metamodel.SingularAttribute;
import java.util.ArrayList;

public abstract class RootServiceImpl<T> implements IRootService<T> {
    IRootDAO<T> rootDAO;

    RootServiceImpl(IRootDAO<T> rootDAO){
        this.rootDAO = rootDAO; 
    }
    
    public void add(T obj) throws HibernateException {
        rootDAO.add(obj);
    }

    public void addOrUpdate(T obj) throws HibernateException {
        rootDAO.addOrUpdate(obj);
    }

    public void update(T obj) throws HibernateException {
        rootDAO.update(obj);
    }

    public T find(Class<T> className, int id) throws HibernateException {
        return rootDAO.find(className, id);
    }

    public T findName(Class<T> tClass, String name) throws HibernateException {
        return rootDAO.findName(tClass, name);
    }

    @Deprecated
    public ArrayList<T> get(String tableName) throws HibernateException {
        return rootDAO.get(tableName);
    }

    public ArrayList<T> get() throws HibernateException {
        return rootDAO.get();
    }

    public ArrayList<T> getSorted(SingularAttribute orderBy) throws HibernateException {
        return rootDAO.getSorted(orderBy);
    }

    public T find(Class className, SingularAttribute attr, String name) throws HibernateException {
        return rootDAO.find(className, attr, name);
    }
}