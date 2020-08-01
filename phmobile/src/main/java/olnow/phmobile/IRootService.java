package olnow.phmobile;

import org.hibernate.HibernateException;

import javax.persistence.metamodel.SingularAttribute;
import java.util.ArrayList;

public interface IRootService<T> {
    void add(T obj);
    void addOrUpdate(T obj);
    void update(T obj);
    T find(Class<T> className, int id);
    T findName(Class<T> tClass, String name);
    @Deprecated
    ArrayList<T> get(String tableName);
    ArrayList<T> getSorted(SingularAttribute orderBy);
    ArrayList<T> get();
    T find(Class className, SingularAttribute attr, String name);
}