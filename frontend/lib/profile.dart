import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
//import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'dart:convert' show json, base64, ascii;
import 'homePage.dart';

const SERVER_IP = 'http://192.168.43.58:7000/api';
final storage = FlutterSecureStorage();

class Profile extends StatelessWidget {
  final String jwt;
  Profile(this.jwt);
  //final Color color;

  //PlaceholderWidget(this.color);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: FutureBuilder(
          future: http
              .read('$SERVER_IP/users/data', headers: {"Authorization": jwt}),
          builder: (context, snapshot) => snapshot.hasData
              ? Column(
                  children: <Widget>[
                    //Text("${payload['username']}, here's the data:"),
                    Text("Hey"),
                    Text(snapshot.data,
                        style: Theme.of(context).textTheme.display1)
                  ],
                )
              : snapshot.hasError
                  ? Text("An error occurred")
                  : CircularProgressIndicator()),
    );
  }
}
