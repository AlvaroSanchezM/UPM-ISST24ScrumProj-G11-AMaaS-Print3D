package ISST_GRUPO11.demo.payload.response;

import java.util.List;

public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    private String homeDirectory;

    public UserInfoResponse(Long id, String username, String email, List<String> roles, String homeDirectory) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.homeDirectory = homeDirectory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setHomeDirectory(String homeDirectory){
        this.homeDirectory = homeDirectory;
    }

    public String getHomeDirectory(){return homeDirectory;}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }
}
