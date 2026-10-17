export const INITIAL_PCB_LIBRARY = [
  {
    id: "pcb-demo-1",
    title: "Arduino Uno R3 Geliştirme Kartı",
    category: "Mikrodenetleyici",
    purpose: "Genel amaçlı prototipleme, robotik kontrol ve sensör okuma kartı.",
    imageUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNTAwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBjYl9hcmQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDA2NjcyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwNGQ1NiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibWV0YWwiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2UyZThmMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzk0YTNiOCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNjYmQ1ZTEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdvbGQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Q5NzcwNiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmNTllMGIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgoKICA8cmVjdCB4PSI1MCIgeT0iMzAiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDQwIiByeD0iMjAiIGZpbGw9InVybCgjcGNiX2FyZCkiIHN0cm9rZT0iIzAwODM4ZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgCiAgPGNpcmNsZSBjeD0iODUiIGN5PSI3MCIgcj0iMTQiIGZpbGw9IiMwNjBiMTQiIHN0cm9rZT0iI2Q5NzcwNiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iODUiIGN5PSI0MzAiIHI9IjE0IiBmaWxsPSIjMDYwYjE0IiBzdHJva2U9IiNkOTc3MDYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxjaXJjbGUgY3g9IjcxNSIgY3k9IjExMCIgcj0iMTQiIGZpbGw9IiMwNjBiMTQiIHN0cm9rZT0iI2Q5NzcwNiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iNzE1IiBjeT0iMzkwIiByPSIxNCIgZmlsbD0iIzA2MGIxNCIgc3Ryb2tlPSIjZDk3NzA2IiBzdHJva2Utd2lkdGg9IjMiLz4KCiAgPHBhdGggZD0iTSAxMjAgMTgwIEwgMjIwIDE4MCBMIDI1MCAyMTAgTCAzMjAgMjEwIiBzdHJva2U9IiMwMDgzOGYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC40Ii8+CiAgPHBhdGggZD0iTSAyODAgMjQwIEwgMzQwIDI0MCBMIDM3MCAyNzAgTCA0NTAgMjcwIiBzdHJva2U9IiMwMDgzOGYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC40Ii8+CiAgPHBhdGggZD0iTSA0MDAgMzUwIEwgNTIwIDM1MCBMIDU1MCAzMjAgTCA2MjAgMzIwIiBzdHJva2U9IiMwMDgzOGYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC40Ii8+CiAgCiAgPHRleHQgeD0iMzYwIiB5PSI5MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjZmZmZmZmIiBsZXR0ZXItc3BhY2luZz0iMiI+QVJEVUlOTzwvdGV4dD4KICA8dGV4dCB4PSI1MDAiIHk9IjkwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDBlNWZmIj5VTk88L3RleHQ+CiAgPHRleHQgeD0iMzY1IiB5PSIxMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2UyZThmMCIgbGV0dGVyLXNwYWNpbmc9IjEiPk1BREUgSU4gSVRBTFkgLSBSRVYgMzwvdGV4dD4KCiAgPCEtLSBVU0ItQiBQb3J0IC0tPgogIDxnIGlkPSJjb21wLXVzYiI+CiAgICA8cmVjdCB4PSIzNSIgeT0iMTEwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEyMCIgcng9IjYiIGZpbGw9InVybCgjbWV0YWwpIiBzdHJva2U9IiM0NzU1NjkiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHJlY3QgeD0iNTAiIHk9IjEzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI4MCIgcng9IjQiIGZpbGw9IiMwZjE3MmEiIHN0cm9rZT0iIzMzNDE1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8cmVjdCB4PSI3NSIgeT0iMTUwIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIHJ4PSIyIiBmaWxsPSIjZjhmYWZjIi8+CiAgICA8dGV4dCB4PSI3NSIgeT0iMjQ1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZTJlOGYwIj5VU0ItQjwvdGV4dD4KICA8L2c+CgogIDwhLS0gREMgQmFycmVsIEphY2sgLS0+CiAgPGcgaWQ9ImNvbXAtZGMiPgogICAgPHJlY3QgeD0iMzUiIHk9IjMyMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMTAiIHJ4PSI2IiBmaWxsPSIjMWUyOTNiIiBzdHJva2U9IiMwZjE3MmEiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHJlY3QgeD0iMjUiIHk9IjM0NSIgd2lkdGg9IjI1IiBoZWlnaHQ9IjYwIiByeD0iMyIgZmlsbD0iIzBmMTcyYSIvPgogICAgPGNpcmNsZSBjeD0iMTA1IiBjeT0iMzc1IiByPSIyMiIgZmlsbD0iIzBmMTcyYSIgc3Ryb2tlPSIjNDc1NTY5IiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjEwNSIgY3k9IjM3NSIgcj0iOCIgZmlsbD0idXJsKCNnb2xkKSIvPgogICAgPHRleHQgeD0iNjUiIHk9IjQ0NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2UyZThmMCI+REMgSU4gNy0xMlY8L3RleHQ+CiAgPC9nPgoKICA8IS0tIEFNUzExMTcgLS0+CiAgPGcgaWQ9ImNvbXAtcmVndWxhdG9yIj4KICAgIDxyZWN0IHg9IjIwMCIgeT0iMzMwIiB3aWR0aD0iNTAiIGhlaWdodD0iNjAiIHJ4PSI0IiBmaWxsPSIjMGYxNzJhIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHJlY3QgeD0iMjEwIiB5PSIzMTgiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9InVybCgjbWV0YWwpIi8+CiAgICA8cmVjdCB4PSIyMDUiIHk9IjM5MCIgd2lkdGg9IjgiIGhlaWdodD0iMTUiIGZpbGw9InVybCgjbWV0YWwpIi8+CiAgICA8cmVjdCB4PSIyMjEiIHk9IjM5MCIgd2lkdGg9IjgiIGhlaWdodD0iMTUiIGZpbGw9InVybCgjbWV0YWwpIi8+CiAgICA8cmVjdCB4PSIyMzciIHk9IjM5MCIgd2lkdGg9IjgiIGhlaWdodD0iMTUiIGZpbGw9InVybCgjbWV0YWwpIi8+CiAgICA8dGV4dCB4PSIyMDUiIHk9IjM2NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjciIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjOTRhM2I4Ij5BTVMxMTE3PC90ZXh0PgogIDwvZz4KCiAgPCEtLSBBVG1lZ2ExNlUyIC0tPgogIDxnIGlkPSJjb21wLTE2dTIiPgogICAgPHJlY3QgeD0iMjMwIiB5PSIxNDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcng9IjQiIGZpbGw9IiMwZjE3MmEiIHN0cm9rZT0iIzMzNDE1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSIyNDAiIGN5PSIxNTAiIHI9IjMiIGZpbGw9IiM2NDc0OGIiLz4KICAgIDx0ZXh0IHg9IjIzNSIgeT0iMTc1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM5NGEzYjgiPk1FR0ExNlUyPC90ZXh0PgogIDwvZz4KCiAgPCEtLSAxNk1IeiBDcnlzdGFsIC0tPgogIDxnIGlkPSJjb21wLWNyeXN0YWwiPgogICAgPHJlY3QgeD0iMzMwIiB5PSIyNzAiIHdpZHRoPSI0NSIgaGVpZ2h0PSIyNSIgcng9IjEwIiBmaWxsPSJ1cmwoI21ldGFsKSIgc3Ryb2tlPSIjNjQ3NDhiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9IjMzNyIgeT0iMjg2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxZTI5M2IiPjE2LjAwMDwvdGV4dD4KICA8L2c+CgogIDwhLS0gQVRtZWdhMzI4UCBESVAtMjggLS0+CiAgPGcgaWQ9ImNvbXAtbWN1Ij4KICAgIDxyZWN0IHg9IjM4MCIgeT0iMjkwIiB3aWR0aD0iMjgwIiBoZWlnaHQ9IjkwIiByeD0iNiIgZmlsbD0iIzFlMjkzYiIgc3Ryb2tlPSIjNDc1NTY5IiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxyZWN0IHg9IjM5MCIgeT0iMzAwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjcwIiByeD0iNCIgZmlsbD0iIzA5MGQxNiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxwYXRoIGQ9Ik0gMzkwIDMyNSBBIDEwIDEwIDAgMCAxIDM5MCAzNDUgWiIgZmlsbD0iIzFlMjkzYiIvPgogICAgPGcgZmlsbD0idXJsKCNtZXRhbCkiPgogICAgICA8cmVjdCB4PSI0MDUiIHk9IjI4MyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNDIzIiB5PSIyODMiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjQ0MSIgeT0iMjgzIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI0NTkiIHk9IjI4MyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNDc3IiB5PSIyODMiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjQ5NSIgeT0iMjgzIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI1MTMiIHk9IjI4MyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNTMxIiB5PSIyODMiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjU0OSIgeT0iMjgzIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI1NjciIHk9IjI4MyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNTg1IiB5PSIyODMiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjYwMyIgeT0iMjgzIiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI2MjEiIHk9IjI4MyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNjM5IiB5PSIyODMiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjQwNSIgeT0iMzc3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI0MjMiIHk9IjM3NyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNDQxIiB5PSIzNzciIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjQ1OSIgeT0iMzc3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI0NzciIHk9IjM3NyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNDk1IiB5PSIzNzciIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjUxMyIgeT0iMzc3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI1MzEiIHk9IjM3NyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNTQ5IiB5PSIzNzciIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjU2NyIgeT0iMzc3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI1ODUiIHk9IjM3NyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNjAzIiB5PSIzNzciIHdpZHRoPSI3IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjYyMSIgeT0iMzc3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI2MzkiIHk9IjM3NyIgd2lkdGg9IjciIGhlaWdodD0iMTAiLz4KICAgIDwvZz4KICAgIDx0ZXh0IHg9IjQzMCIgeT0iMzQwIiBmb250LWZhbWlseT0iQ291cmllciwgbW9ub3NwYWNlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2NiZDVlMSIgbGV0dGVyLXNwYWNpbmc9IjQiPkFUTUVHQTMyOFAtUFU8L3RleHQ+CiAgICA8dGV4dCB4PSI0OTAiIHk9IjM2MCIgZm9udC1mYW1pbHk9IkNvdXJpZXIsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk0YTNiOCI+QVRNRUwgMjM0NTwvdGV4dD4KICA8L2c+CgogIDxnIGlkPSJoZWFkZXItZGlnaXRhbCI+CiAgICA8cmVjdCB4PSIzNjAiIHk9IjMyIiB3aWR0aD0iMzYwIiBoZWlnaHQ9IjMwIiByeD0iMyIgZmlsbD0iIzBmMTcyYSIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9IjQyMCIgeT0iNTIiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMzOGJkZjgiPkRJR0lUQUwgKFBXTSB+KTwvdGV4dD4KICA8L2c+CgogIDxnIGlkPSJoZWFkZXItYW5hbG9nIj4KICAgIDxyZWN0IHg9IjMyMCIgeT0iNDM4IiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjMwIiByeD0iMyIgZmlsbD0iIzBmMTcyYSIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9IjM2MCIgeT0iNDU4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZjU5ZTBiIj5QT1dFUjwvdGV4dD4KICAgIDxyZWN0IHg9IjUwMCIgeT0iNDM4IiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMwIiByeD0iMyIgZmlsbD0iIzBmMTcyYSIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9IjU2MCIgeT0iNDU4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMzRkMzk5Ij5BTkFMT0cgSU48L3RleHQ+CiAgPC9nPgoKICA8ZyBpZD0iYnRuLXJlc2V0Ij4KICAgIDxyZWN0IHg9IjE5MCIgeT0iNTUiIHdpZHRoPSIzNSIgaGVpZ2h0PSIzNSIgcng9IjQiIGZpbGw9IiM2NDc0OGIiIHN0cm9rZT0iIzMzNDE1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSIyMDcuNSIgY3k9IjcyLjUiIHI9IjEwIiBmaWxsPSIjZGMyNjI2Ii8+CiAgICA8dGV4dCB4PSIxOTUiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjkiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIj5SRVNFVDwvdGV4dD4KICA8L2c+Cjwvc3ZnPg==",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:00:00.000Z",
    userNotes: "Robotik projeler için ana mikrodenetleyici kartı. 5V LDO regülatör ve 16MHz kristal barındırır.",
    tags: ["Arduino", "ATmega328P", "5V", "USB-B", "Rev3"],
    isAnalyzed: true,
    dimensions: "68.6 x 53.4 mm",
    layerCount: "Çift Katman (2-Layer FR4)",
    confidence: "99.2%",
    components: [
      {
        id: "c-ard-1",
        name: "ATmega328P-PU",
        category: "Mikrodenetleyici (MCU)",
        packageType: "DIP-28",
        functionDesc: "8-bit AVR İşlemci; Arduino kodlarının yürütüldüğü ana mikrodenetleyici.",
        pinoutInfo: "Pin 1: Reset, Pin 7: VCC (5V), Pin 8: GND, Pin 9-10: 16MHz Kristal, Port B/C/D GPIO",
        bbox: { x: 47.5, y: 56.6, w: 35.0, h: 20.8 }
      },
      {
        id: "c-ard-2",
        name: "16.000 MHz Kristal Osilatör",
        category: "Kristal Osilatör",
        packageType: "HC-49S Metal Can",
        functionDesc: "İşlemciye hassas 16 MHz sistem saat frekansı sinyali sağlar.",
        pinoutInfo: "XTAL1 ve XTAL2 bacaklarına 22pF yük kondansatörleriyle bağlıdır.",
        bbox: { x: 41.2, y: 54.0, w: 5.6, h: 5.0 }
      },
      {
        id: "c-ard-3",
        name: "AMS1117-5.0 LDO",
        category: "Voltaj Regülatörü",
        packageType: "SOT-223",
        functionDesc: "DC jakından gelen 7-12V harici gerilimi stabil 5V mantık seviyesine düşürür.",
        pinoutInfo: "Pin 1: GND, Pin 2/Tab: VOUT (5V), Pin 3: VIN (7-12V)",
        bbox: { x: 25.0, y: 63.6, w: 6.2, h: 17.4 }
      },
      {
        id: "c-ard-4",
        name: "ATmega16U2 (USB-Seri)",
        category: "Entegre Devre (IC)",
        packageType: "QFN-32",
        functionDesc: "Bilgisayar USB portu ile ana MCU arasındaki seri iletişimi dönüştürür.",
        pinoutInfo: "USB D+, D- sinyallerini USART Rx/Tx pinlerine köprüler.",
        bbox: { x: 28.7, y: 28.0, w: 7.5, h: 12.0 }
      },
      {
        id: "c-ard-5",
        name: "USB Type-B Portu",
        category: "Konnektör / Port",
        packageType: "Through-Hole USB-B",
        functionDesc: "Program yükleme ve 5V USB besleme girişi sağlar.",
        pinoutInfo: "Pin 1: VBUS (+5V), Pin 2: D-, Pin 3: D+, Pin 4: GND",
        bbox: { x: 4.3, y: 22.0, w: 16.2, h: 24.0 }
      },
      {
        id: "c-ard-6",
        name: "DC Güç Jakı (2.1mm)",
        category: "Konnektör / Port",
        packageType: "Barrel Jack 5.5/2.1mm",
        functionDesc: "7V-12V harici adaptör veya 9V pil girişi.",
        pinoutInfo: "Merkez pin pozitif (+), dış bilezik şase/toprak (-)",
        bbox: { x: 4.3, y: 64.0, w: 17.5, h: 22.0 }
      }
    ]
  },
  {
    id: "pcb-demo-2",
    title: "NE555 Hassas Zamanlayıcı Modülü",
    category: "Genel / Özel Devre",
    purpose: "Kare dalga frekans üreteci, darbe genişlik modülasyonu (PWM) ve flaşör devresi.",
    imageUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3MDAgNTAwIiB3aWR0aD0iNzAwIiBoZWlnaHQ9IjUwMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBjYl9ibHVlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFlM2E4YSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwZjE3MmEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsX3NoIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmOGZhZmMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM5NGEzYjgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjQ3NDhiIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KCiAgPHJlY3QgeD0iNDAiIHk9IjMwIiB3aWR0aD0iNjIwIiBoZWlnaHQ9IjQ0MCIgcng9IjE2IiBmaWxsPSJ1cmwoI3BjYl9ibHVlKSIgc3Ryb2tlPSIjMjU2M2ViIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjYwIiByPSIxMiIgZmlsbD0iIzA2MGIxNCIgc3Ryb2tlPSIjZDk3NzA2IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8Y2lyY2xlIGN4PSI2MzAiIGN5PSI2MCIgcj0iMTIiIGZpbGw9IiMwNjBiMTQiIHN0cm9rZT0iI2Q5NzcwNiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iNzAiIGN5PSI0NDAiIHI9IjEyIiBmaWxsPSIjMDYwYjE0IiBzdHJva2U9IiNkOTc3MDYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxjaXJjbGUgY3g9IjYzMCIgY3k9IjQ0MCIgcj0iMTIiIGZpbGw9IiMwNjBiMTQiIHN0cm9rZT0iI2Q5NzcwNiIgc3Ryb2tlLXdpZHRoPSIzIi8+CgogIDx0ZXh0IHg9IjIxMCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI2ZmZmZmZiIgbGV0dGVyLXNwYWNpbmc9IjEiPk5FNTU1IFBVTFNFIEdFTkVSQVRPUjwvdGV4dD4KICA8dGV4dCB4PSIyNzAiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTNjNWZkIj5EVVRZIENZQ0xFICZhbXA7IEZSRVFVRU5DWSBBREpVU1RBQkxFPC90ZXh0PgoKICA8IS0tIEZpbHRlciBDYXBhY2l0b3IgLS0+CiAgPGcgaWQ9ImNvbXAtY2FwIj4KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjI1MCIgcj0iNTUiIGZpbGw9IiMwOTBkMTYiIHN0cm9rZT0iIzMzNDE1NSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8cGF0aCBkPSJNIDk1IDIxMCBBIDU1IDU1IDAgMCAwIDk1IDI5MCBaIiBmaWxsPSIjOTRhM2I4Ii8+CiAgICA8dGV4dCB4PSIxMDAiIHk9IjI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzBmMTcyYSI+LTwvdGV4dD4KICAgIDx0ZXh0IHg9IjEyNSIgeT0iMjQ1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIj4xMDDCtUY8L3RleHQ+CiAgICA8dGV4dCB4PSIxMzAiIHk9IjI2NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMzhiZGY4Ij4xNlY8L3RleHQ+CiAgICA8dGV4dCB4PSIxMTAiIHk9IjMyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2NiZDVlMSI+QzEgRklMVEVSPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBORTU1NSBJQyAtLT4KICA8ZyBpZD0iY29tcC1uZTU1NSI+CiAgICA8cmVjdCB4PSIyNjAiIHk9IjE3MCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxNjAiIHJ4PSI4IiBmaWxsPSIjMWUyOTNiIiBzdHJva2U9IiM0NzU1NjkiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHJlY3QgeD0iMjg1IiB5PSIxODUiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTMwIiByeD0iNCIgZmlsbD0iIzAyMDYxNyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxjaXJjbGUgY3g9IjM1MCIgY3k9IjE4NSIgcj0iMTAiIGZpbGw9IiMxZTI5M2IiLz4KICAgIDxnIGZpbGw9InVybCgjbWV0YWxfc2gpIj4KICAgICAgPHJlY3QgeD0iMjQ4IiB5PSIxOTUiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNCIvPgogICAgICA8cmVjdCB4PSIyNDgiIHk9IjIyNSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE0Ii8+CiAgICAgIDxyZWN0IHg9IjI0OCIgeT0iMjU1IiB3aWR0aD0iMTIiIGhlaWdodD0iMTQiLz4KICAgICAgPHJlY3QgeD0iMjQ4IiB5PSIyODUiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNCIvPgogICAgICA8cmVjdCB4PSI0NDAiIHk9IjE5NSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE0Ii8+CiAgICAgIDxyZWN0IHg9IjQ0MCIgeT0iMjI1IiB3aWR0aD0iMTIiIGhlaWdodD0iMTQiLz4KICAgICAgPHJlY3QgeD0iNDQwIiB5PSIyNTUiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNCIvPgogICAgICA8cmVjdCB4PSI0NDAiIHk9IjI4NSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE0Ii8+CiAgICA8L2c+CiAgICA8dGV4dCB4PSIzMTAiIHk9IjI1MCIgZm9udC1mYW1pbHk9IkNvdXJpZXIsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZmZmYiIGxldHRlci1zcGFjaW5nPSIyIj5ORTU1NVA8L3RleHQ+CiAgICA8dGV4dCB4PSIzMjAiIHk9IjI3NSIgZm9udC1mYW1pbHk9IkNvdXJpZXIsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk0YTNiOCI+VEkgMjAyNDwvdGV4dD4KICA8L2c+CgogIDwhLS0gMzI5NlcgVHJpbXBvdCAtLT4KICA8ZyBpZD0iY29tcC10cmltcG90Ij4KICAgIDxyZWN0IHg9IjQ5MCIgeT0iMTcwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgcng9IjYiIGZpbGw9IiMyNTYzZWIiIHN0cm9rZT0iIzFkNGVkOCIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSI1ODUiIGN5PSIyMDAiIHI9IjE0IiBmaWxsPSIjZDk3NzA2IiBzdHJva2U9IiNiNDUzMDkiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPGxpbmUgeDE9IjU3NSIgeTE9IjIwMCIgeDI9IjU5NSIgeTI9IjIwMCIgc3Ryb2tlPSIjNzgzNTBmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDx0ZXh0IHg9IjUwNSIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIj4zMjk2VzwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwNSIgeT0iMjc1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmVmMDhhIj4xMGvOqSBQT1Q8L3RleHQ+CiAgPC9nPgoKICA8IS0tIENvbm5lY3Rpb24gSGVhZGVyIC0tPgogIDxnIGlkPSJjb21wLWhlYWRlciI+CiAgICA8cmVjdCB4PSIyNTAiIHk9IjM5MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI1MCIgcng9IjQiIGZpbGw9IiMwZjE3MmEiIHN0cm9rZT0iIzMzNDE1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSIyODAiIGN5PSI0MTUiIHI9IjEwIiBmaWxsPSJ1cmwoI21ldGFsX3NoKSIvPgogICAgPGNpcmNsZSBjeD0iMzMwIiBjeT0iNDE1IiByPSIxMCIgZmlsbD0idXJsKCNtZXRhbF9zaCkiLz4KICAgIDxjaXJjbGUgY3g9IjM4MCIgY3k9IjQxNSIgcj0iMTAiIGZpbGw9InVybCgjbWV0YWxfc2gpIi8+CiAgICA8Y2lyY2xlIGN4PSI0MzAiIGN5PSI0MTUiIHI9IjEwIiBmaWxsPSJ1cmwoI21ldGFsX3NoKSIvPgogICAgPHRleHQgeD0iMjcwIiB5PSI0NTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNlMmU4ZjAiPlZDQzwvdGV4dD4KICAgIDx0ZXh0IHg9IjMyMCIgeT0iNDU1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZTJlOGYwIj5HTkQ8L3RleHQ+CiAgICA8dGV4dCB4PSIzNzAiIHk9IjQ1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzM4YmRmOCI+T1VUPC90ZXh0PgogICAgPHRleHQgeD0iNDIwIiB5PSI0NTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMzNGQzOTkiPlRSSUc8L3RleHQ+CiAgPC9nPgo8L3N2Zz4=",
    createdAt: "2026-10-02T14:30:00.000Z",
    updatedAt: "2026-10-02T14:30:00.000Z",
    userNotes: "LED flaşör ve PWM motor hız kontrolü için ayarlanabilir frekans üreteci.",
    tags: ["Zamanlayıcı", "PWM", "Analog", "NE555", "Osilatör"],
    isAnalyzed: true,
    dimensions: "31.0 x 22.0 mm",
    layerCount: "Tek/Çift Katman FR4",
    confidence: "98.5%",
    components: [
      {
        id: "c-ne-1",
        name: "NE555P Zamanlayıcı IC",
        category: "Entegre Devre (IC)",
        packageType: "DIP-8",
        functionDesc: "Monostable ve Astable modlarda çalışan klasik zamanlayıcı osilatör entegresi.",
        pinoutInfo: "Pin 1: GND, Pin 2: Trigger, Pin 3: Output, Pin 4: Reset, Pin 5: Control, Pin 6: Threshold, Pin 7: Discharge, Pin 8: VCC (4.5V-15V)",
        bbox: { x: 37.1, y: 34.0, w: 25.7, h: 32.0 }
      },
      {
        id: "c-ne-2",
        name: "3296W 10kΩ Çok Turlu Trimpot",
        category: "Pasif Eleman (Direnç/Kondansatör)",
        packageType: "3296W Trimmer",
        functionDesc: "Kondansatör şarj/deşarj süresini değiştirerek çıkış darbe frekansını ayarlar.",
        pinoutInfo: "Vidalı hassas ayar mekanizmalı gerilim bölücü direnç.",
        bbox: { x: 70.0, y: 34.0, w: 17.1, h: 28.0 }
      },
      {
        id: "c-ne-3",
        name: "100µF 16V Elektrolitik Kondansatör",
        category: "Pasif Eleman (Direnç/Kondansatör)",
        packageType: "Radial Elektrolitik",
        functionDesc: "Besleme hattındaki parazitleri filtreler ve periyodik deşarj zamanlamasını belirler.",
        pinoutInfo: "Gövdedeki çizgili taraf negatif (-), uzun bacak pozitif (+).",
        bbox: { x: 13.5, y: 39.0, w: 15.7, h: 22.0 }
      },
      {
        id: "c-ne-4",
        name: "Bağlantı Terminal Pinleri",
        category: "Konnektör / Port",
        packageType: "2.54mm 4-Pin Header",
        functionDesc: "Güç girişi ve kare dalga sinyal çıkışı pinleri.",
        pinoutInfo: "Pin 1: VCC (5-12V), Pin 2: GND, Pin 3: OUT (Sinyal), Pin 4: TRIG",
        bbox: { x: 35.7, y: 78.0, w: 28.5, h: 10.0 }
      }
    ]
  },
  {
    id: "pcb-demo-3",
    title: "TP4056 Lityum Pil Şarj & Koruma Modülü",
    category: "Güç & Şarj Katı",
    purpose: "1S (3.7V) 18650 Lityum-İyon piller için güvenli sabit akım/gerilim şarjı ve deşarj koruması.",
    imageUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3MDAgNTAwIiB3aWR0aD0iNzAwIiBoZWlnaHQ9IjUwMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBjYl90cCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTQwYWYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTcyNTU0Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJnb2xkX3BhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmNTllMGIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZDk3NzA2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJtZXRhbF9jIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNjYmQ1ZTEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjQ3NDhiIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KCiAgPHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgcng9IjEyIiBmaWxsPSJ1cmwoI3BjYl90cCkiIHN0cm9rZT0iIzNiODJmNiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CgogIDwhLS0gU29sZGVyIFBhZHMgLS0+CiAgPHJlY3QgeD0iNjUiIHk9IjcwIiB3aWR0aD0iNDUiIGhlaWdodD0iNTUiIHJ4PSI2IiBmaWxsPSJ1cmwoI2dvbGRfcGFkKSIgc3Ryb2tlPSIjYjQ1MzA5IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI3NSIgeT0iMTA1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiMwMDAiPklOKzwvdGV4dD4KCiAgPHJlY3QgeD0iNjUiIHk9IjM3NSIgd2lkdGg9IjQ1IiBoZWlnaHQ9IjU1IiByeD0iNiIgZmlsbD0idXJsKCNnb2xkX3BhZCkiIHN0cm9rZT0iI2I0NTMwOSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iNzUiIHk9IjQxMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjMDAwIj5JTi08L3RleHQ+CgogIDxyZWN0IHg9IjU5MCIgeT0iMTUwIiB3aWR0aD0iNDUiIGhlaWdodD0iNTUiIHJ4PSI2IiBmaWxsPSJ1cmwoI2dvbGRfcGFkKSIgc3Ryb2tlPSIjYjQ1MzA5IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI1OTUiIHk9IjE4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjMDAwIj5CKzwvdGV4dD4KCiAgPHJlY3QgeD0iNTkwIiB5PSIyOTUiIHdpZHRoPSI0NSIgaGVpZ2h0PSI1NSIgcng9IjYiIGZpbGw9InVybCgjZ29sZF9wYWQpIiBzdHJva2U9IiNiNDUzMDkiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjU5NSIgeT0iMzMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiMwMDAiPkItPC90ZXh0PgoKICA8cmVjdCB4PSI1OTAiIHk9IjcwIiB3aWR0aD0iNDUiIGhlaWdodD0iNTUiIHJ4PSI2IiBmaWxsPSJ1cmwoI2dvbGRfcGFkKSIgc3Ryb2tlPSIjYjQ1MzA5IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI1OTMiIHk9IjEwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjMDAwIj5PVVQrPC90ZXh0PgoKICA8cmVjdCB4PSI1OTAiIHk9IjM3NSIgd2lkdGg9IjQ1IiBoZWlnaHQ9IjU1IiByeD0iNiIgZmlsbD0idXJsKCNnb2xkX3BhZCkiIHN0cm9rZT0iI2I0NTMwOSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iNTkzIiB5PSI0MTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iIzAwMCI+T1VULTwvdGV4dD4KCiAgPCEtLSBVU0IgVHlwZS1DIC0tPgogIDxnIGlkPSJjb21wLXR5cGVjIj4KICAgIDxyZWN0IHg9IjQwIiB5PSIxOTAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIiByeD0iMTAiIGZpbGw9InVybCgjbWV0YWxfYykiIHN0cm9rZT0iIzQ3NTU2OSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8cmVjdCB4PSI1NSIgeT0iMjE1IiB3aWR0aD0iOTUiIGhlaWdodD0iNzAiIHJ4PSI4IiBmaWxsPSIjMGYxNzJhIiBzdHJva2U9IiMxZTI5M2IiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHJlY3QgeD0iODAiIHk9IjI0MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjIwIiByeD0iNCIgZmlsbD0iIzM4YmRmOCIvPgogICAgPHRleHQgeD0iNjUiIHk9IjMyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2UyZThmMCI+VFlQRS1DIDVWPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBUUDQwNTYgSUMgLS0+CiAgPGcgaWQ9ImNvbXAtdHA0MDU2Ij4KICAgIDxyZWN0IHg9IjIyMCIgeT0iMTgwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE0MCIgcng9IjYiIGZpbGw9IiMwOTBkMTYiIHN0cm9rZT0iIzFlMjkzYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSIyNTAiIGN5PSIyMDAiIHI9IjUiIGZpbGw9IiM0NzU1NjkiLz4KICAgIDxnIGZpbGw9InVybCgjbWV0YWxfYykiPgogICAgICA8cmVjdCB4PSIyMDgiIHk9IjE5NSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIi8+CiAgICAgIDxyZWN0IHg9IjIwOCIgeT0iMjI1IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiLz4KICAgICAgPHJlY3QgeD0iMjA4IiB5PSIyNTUiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIvPgogICAgICA8cmVjdCB4PSIyMDgiIHk9IjI4NSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIi8+CiAgICAgIDxyZWN0IHg9IjM3MCIgeT0iMTk1IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiLz4KICAgICAgPHJlY3QgeD0iMzcwIiB5PSIyMjUiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIvPgogICAgICA8cmVjdCB4PSIzNzAiIHk9IjI1NSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIi8+CiAgICAgIDxyZWN0IHg9IjM3MCIgeT0iMjg1IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiLz4KICAgIDwvZz4KICAgIDx0ZXh0IHg9IjI1MCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIj5UUDQwNTY8L3RleHQ+CiAgICA8dGV4dCB4PSIyNTAiIHk9IjI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIiBmaWxsPSIjOTRhM2I4Ij4xQSBDSEFSR0VSPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBEVzAxQSAtLT4KICA8ZyBpZD0iY29tcC1kdzAxIj4KICAgIDxyZWN0IHg9IjQyMCIgeT0iMjAwIiB3aWR0aD0iNzAiIGhlaWdodD0iNTAiIHJ4PSIzIiBmaWxsPSIjMDkwZDE2IiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHRleHQgeD0iNDMwIiB5PSIyMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmODcxNzEiPkRXMDFBPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBGUzgyMDVBIC0tPgogIDxnIGlkPSJjb21wLWZzODIwNSI+CiAgICA8cmVjdCB4PSI1MDAiIHk9IjE5MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjcwIiByeD0iMyIgZmlsbD0iIzA5MGQxNiIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9IjUwNSIgeT0iMjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMzhiZGY4Ij5GUzgyMDVBPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBMRURzIC0tPgogIDxnIGlkPSJjb21wLWxlZHMtdHAiPgogICAgPHJlY3QgeD0iMjUwIiB5PSIxMDAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgcng9IjIiIGZpbGw9IiNlZjQ0NDQiIHN0cm9rZT0iI2I5MWMxYyIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8dGV4dCB4PSIyOTAiIHk9IjExNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZjYTVhNSI+Q0hSRyAoUkVEKTwvdGV4dD4KCiAgICA8cmVjdCB4PSIyNTAiIHk9IjEzMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiByeD0iMiIgZmlsbD0iIzNiODJmNiIgc3Ryb2tlPSIjMWQ0ZWQ4IiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDx0ZXh0IHg9IjI5MCIgeT0iMTQ1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjOTNjNWZkIj5TVERCWSAoQkxVRSk8L3RleHQ+CiAgPC9nPgoKICA8dGV4dCB4PSIyODAiIHk9IjM4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiI+VFA0MDU2IDFTIExJLUlPTjwvdGV4dD4KPC9zdmc+",
    createdAt: "2026-10-03T09:15:00.000Z",
    updatedAt: "2026-10-03T09:15:00.000Z",
    userNotes: "Powerbank ve taşınabilir projelerde tek hücre Li-Ion pil şarjı için BMS korumalı modül.",
    tags: ["Li-Ion", "18650", "BMS", "Type-C", "Şarj"],
    isAnalyzed: true,
    dimensions: "28.0 x 17.5 mm",
    layerCount: "Çift Katman FR4",
    confidence: "99.0%",
    components: [
      {
        id: "c-tp-1",
        name: "TP4056 Şarj Kontrolörü",
        category: "Entegre Devre (IC)",
        packageType: "SOP-8-PP",
        functionDesc: "Tek hücre Li-Ion piller için CC/CV doğrusal şarj yöneticisi entegresi.",
        pinoutInfo: "Pin 4: VCC (5V), Pin 5: BAT (Pil +), Pin 6: STDBY (Mavi LED), Pin 7: CHRG (Kırmızı LED), Pin 8: CE",
        bbox: { x: 31.4, y: 36.0, w: 21.4, h: 28.0 }
      },
      {
        id: "c-tp-2",
        name: "USB Type-C Giriş Portu",
        category: "Konnektör / Port",
        packageType: "SMD Type-C 16-Pin",
        functionDesc: "5V standart şarj cihazı adaptör girişi.",
        pinoutInfo: "VBUS (+5V), GND, CC1/CC2 5.1k dirençli şarj tanıma pinleri.",
        bbox: { x: 5.7, y: 38.0, w: 18.5, h: 24.0 }
      },
      {
        id: "c-tp-3",
        name: "DW01A Pil Koruma IC",
        category: "Entegre Devre (IC)",
        packageType: "SOT-23-6",
        functionDesc: "Aşırı deşarj (<2.4V), aşırı şarj (>4.3V) ve kısa devre durumlarını denetler.",
        pinoutInfo: "Pin 1: OD (Deşarj Kesme), Pin 3: OC (Şarj Kesme), Pin 5: VDD (Pil Ölçüm)",
        bbox: { x: 60.0, y: 40.0, w: 10.0, h: 10.0 }
      },
      {
        id: "c-tp-4",
        name: "FS8205A Dual N-MOSFET",
        category: "Transistör / MOSFET",
        packageType: "TSSOP-8",
        functionDesc: "DW01A koruma sinyaline göre pilin negatif hattını anahtarlayan çift MOSFET.",
        pinoutInfo: "Drain-Source direnci çok düşük (25mΩ) iki bağımsız N-Kanal transistör.",
        bbox: { x: 71.4, y: 38.0, w: 8.5, h: 14.0 }
      },
      {
        id: "c-tp-5",
        name: "Durum Gösterge LED'leri",
        category: "Diyot / Gösterge LED",
        packageType: "0805 SMD LED",
        functionDesc: "Kırmızı (Şarj Oluyor - CHRG) ve Mavi (Şarj Tamamlandı - STDBY) indikatörleri.",
        pinoutInfo: "1k dirençlerle TP4056 indikatör bacaklarına bağlıdır.",
        bbox: { x: 35.7, y: 20.0, w: 4.3, h: 10.0 }
      }
    ]
  },
  {
    id: "pcb-demo-4",
    title: "PAM8403 2x3W D-Sınıfı Stereo Ses Amplifikatörü",
    category: "Ses & Amplifikatör",
    purpose: "Düşük güç tüketimli, yüksek verimli (%90) taşınabilir stereo hoparlör sürücü katı.",
    imageUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3MDAgNTAwIiB3aWR0aD0iNzAwIiBoZWlnaHQ9IjUwMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBjYl9ncmVlbiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxNTgwM2QiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTQ1MzJkIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJrbm9iIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzMzNDE1NSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzBmMTcyYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMjA2MTciLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsX3BvdCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjhmYWZjIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjOTRhM2I4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzQ3NTU2OSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjYyMCIgaGVpZ2h0PSI0MjAiIHJ4PSIxNCIgZmlsbD0idXJsKCNwY2JfZ3JlZW4pIiBzdHJva2U9IiMyMmM1NWUiIHN0cm9rZS13aWR0aD0iNCIvPgoKICA8IS0tIFRlcm1pbmFscyAtLT4KICA8ZyBpZD0iY29tcC10ZXJtaW5hbHMtbGVmdCI+CiAgICA8cmVjdCB4PSI2MCIgeT0iNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iOTAiIHJ4PSI2IiBmaWxsPSIjMWUyOTNiIiBzdHJva2U9IiMwZjE3MmEiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iMTE1IiByPSIyMiIgZmlsbD0idXJsKCNtZXRhbF9wb3QpIi8+CiAgICA8Y2lyY2xlIGN4PSIxMTAiIGN5PSIxMTUiIHI9IjgiIGZpbGw9IiNkOTc3MDYiLz4KICAgIDx0ZXh0IHg9IjcwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI2ZmZmZmZiI+TF9TUEsgKCsvLSk8L3RleHQ+CiAgICAKICAgIDxyZWN0IHg9IjYwIiB5PSIyMTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iOTAiIHJ4PSI2IiBmaWxsPSIjMWUyOTNiIiBzdHJva2U9IiMwZjE3MmEiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iMjU1IiByPSIyMiIgZmlsbD0idXJsKCNtZXRhbF9wb3QpIi8+CiAgICA8Y2lyY2xlIGN4PSIxMTAiIGN5PSIyNTUiIHI9IjgiIGZpbGw9IiNkOTc3MDYiLz4KICAgIDx0ZXh0IHg9IjcwIiB5PSIzMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI2ZmZmZmZiI+Ul9TUEsgKCsvLSk8L3RleHQ+CgogICAgPHJlY3QgeD0iNjAiIHk9IjM1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI2MCIgcng9IjYiIGZpbGw9IiMwZjE3MmEiIHN0cm9rZT0iIzMzNDE1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8dGV4dCB4PSI3NSIgeT0iMzg1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZjU5ZTBiIj5QT1dFUiA1VjwvdGV4dD4KICA8L2c+CgogIDwhLS0gUEFNODQwMyBJQyAtLT4KICA8ZyBpZD0iY29tcC1wYW04NDAzIj4KICAgIDxyZWN0IHg9IjI0OCIgeT0iMTYwIiB3aWR0aD0iMTc0IiBoZWlnaHQ9IjE4MCIgcng9IjYiIGZpbGw9IiMwOTBkMTYiIHN0cm9rZT0iIzFlMjkzYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8Y2lyY2xlIGN4PSIyODAiIGN5PSIxODAiIHI9IjYiIGZpbGw9IiM0NzU1NjkiLz4KICAgIDxnIGZpbGw9InVybCgjbWV0YWxfcG90KSI+CiAgICAgIDxyZWN0IHg9IjIzNiIgeT0iMTgwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iMjM2IiB5PSIyMDAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSIyMzYiIHk9IjIyMCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjIzNiIgeT0iMjQwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iMjM2IiB5PSIyNjAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSIyMzYiIHk9IjI4MCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjIzNiIgeT0iMzAwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iMjM2IiB5PSIzMjAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI0MjAiIHk9IjE4MCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjQyMCIgeT0iMjAwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNDIwIiB5PSIyMjAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI0MjAiIHk9IjI0MCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjQyMCIgeT0iMjYwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAiLz4KICAgICAgPHJlY3QgeD0iNDIwIiB5PSIyODAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMCIvPgogICAgICA8cmVjdCB4PSI0MjAiIHk9IjMwMCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEwIi8+CiAgICAgIDxyZWN0IHg9IjQyMCIgeT0iMzIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAiLz4KICAgIDwvZz4KICAgIDx0ZXh0IHg9IjI4NSIgeT0iMjQ1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiNmZmZmZmYiPlBBTTg0MDM8L3RleHQ+CiAgICA8dGV4dCB4PSIyOTAiIHk9IjI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjODZlZmFjIj5DTEFTUy1EIEFNUDwvdGV4dD4KICAgIDx0ZXh0IHg9IjMwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM5NGEzYjgiPjIgeCAzVyBAIDTOqTwvdGV4dD4KICA8L2c+CgogIDwhLS0gQmlnIFZvbHVtZSBQb3RlbnRpb21ldGVyIC0tPgogIDxnIGlkPSJjb21wLXBvdGVudGlvbWV0ZXIiPgogICAgPHJlY3QgeD0iNDYwIiB5PSIxMzAiIHdpZHRoPSIxNzAiIGhlaWdodD0iMjQwIiByeD0iMTIiIGZpbGw9InVybCgjbWV0YWxfcG90KSIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjU0NSIgY3k9IjI1MCIgcj0iNzUiIGZpbGw9InVybCgja25vYikiIHN0cm9rZT0iIzBmMTcyYSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgICA8Y2lyY2xlIGN4PSI1NDUiIGN5PSIyNTAiIHI9IjYwIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NzU1NjkiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWRhc2hhcnJheT0iOCA2Ii8+CiAgICA8bGluZSB4MT0iNTQ1IiB5MT0iMTkwIiB4Mj0iNTQ1IiB5Mj0iMjE1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8dGV4dCB4PSI0ODAiIHk9IjM5NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiI+Vk9MVU1FIC8gUE9XRVI8L3RleHQ+CiAgPC9nPgoKICA8dGV4dCB4PSIyMjAiIHk9IjkwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiNmZmZmZmYiPlBBTTg0MDMgU1RFUkVPIEFNUDwvdGV4dD4KPC9zdmc+",
    createdAt: "2026-10-04T16:20:00.000Z",
    updatedAt: "2026-10-04T16:20:00.000Z",
    userNotes: "Bluetooth hoparlör ve taşınabilir ses sistemleri için 5V ile çalışan mini amfi kartı.",
    tags: ["Ses", "Amfi", "Class-D", "Stereo", "PAM8403", "3W"],
    isAnalyzed: true,
    dimensions: "29.5 x 20.2 mm",
    layerCount: "Çift Katman FR4",
    confidence: "98.7%",
    components: [
      {
        id: "c-pam-1",
        name: "PAM8403 D-Class Audio IC",
        category: "Entegre Devre (IC)",
        packageType: "SOP-16",
        functionDesc: "Filtresiz D-Sınıfı 3W + 3W stereo ses amplifikatörü.",
        pinoutInfo: "Pin 1-2: Sol Ses Girişi, Pin 7: 5V VDD, Pin 11-12: Sol Hoparlör (+/-), Pin 13-14: Sağ Hoparlör (+/-)",
        bbox: { x: 35.4, y: 32.0, w: 24.8, h: 36.0 }
      },
      {
        id: "c-pam-2",
        name: "Ses Potansiyometresi & Anahtar",
        category: "Konnektör / Port",
        packageType: "Rotary Potentiometer with Switch",
        functionDesc: "Çift kanallı ses seviyesi ayarlama ve entegre güç açma/kapama anahtarı.",
        pinoutInfo: "Dahili tıklamalı güç anahtarı ve logaritmik ses zayıflatma dirençleri.",
        bbox: { x: 65.7, y: 26.0, w: 24.2, h: 48.0 }
      },
      {
        id: "c-pam-3",
        name: "Hoparlör ve Güç Terminalleri",
        category: "Konnektör / Port",
        packageType: "Vidalı Terminal / Lehim Adaları",
        functionDesc: "Sol Hoparlör (+/-), Sağ Hoparlör (+/-) ve 5V Besleme Girişi bağlantıları.",
        pinoutInfo: "L_OUT+, L_OUT-, R_OUT+, R_OUT-, 5V, GND",
        bbox: { x: 8.5, y: 14.0, w: 14.2, h: 68.0 }
      }
    ]
  }
];
