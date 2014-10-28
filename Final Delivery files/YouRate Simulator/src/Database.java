/**
 *
 * @author rudiger
 */
public interface Database {
    public void open();

    public void close();

    public void insert(String email, String uid);

    public boolean updateEmail(String email, String uid);
    
    public boolean updateUID(String email, String uid);

    public boolean delete(String email, String uid);

    public boolean userExists(String email);

    public boolean deviceExists(String uid);

    public boolean shouldAutoLogin(String email, String uid);

    public void selectAll();
    
    public String getMail(String uid);
    
}
