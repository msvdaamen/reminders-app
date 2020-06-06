import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import gql from "graphql-tag";
import {AuthRepository} from "../../../repositories/auth.repository";
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {ApolloQueryResult} from "apollo-client";
import {AuthUser} from "../../../graphql";

const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: {username: $username, password: $password}) {
      user {
        id
        name
        username
      }
      accessToken
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private authRepository: AuthRepository
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const user = this.loginForm.value;
    this.apollo.mutate({
      mutation: loginMutation,
      variables: {
        ...user
      }
    }).subscribe((data: ApolloQueryResult<{ login: AuthUser }>) => {
      localStorage.setItem('accessToken', data.data.login.accessToken);
      this.authRepository.setAuth(data.data.login);
      this.router.navigate(['/']);
    }, () => {
    });
  }
}
