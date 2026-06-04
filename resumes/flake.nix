{
  description = "React MDX resume PDF workspace";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
          fonts = [
            pkgs.pretendard
            pkgs.noto-fonts
            pkgs.noto-fonts-cjk-sans
            pkgs.noto-fonts-cjk-serif
            pkgs.noto-fonts-color-emoji
          ];
        in
        {
          default = pkgs.mkShell {
            packages =
              [
                pkgs.chromium
                pkgs.fontconfig
                pkgs.nodejs_22
                pkgs.poppler-utils
              ]
              ++ fonts;

            CHROME_PATH = "${pkgs.chromium}/bin/chromium";
            FONTCONFIG_FILE = pkgs.makeFontsConf { fontDirectories = fonts; };

            shellHook = ''
              mkdir -p dist

              if [[ $- == *i* ]]; then
                echo "React MDX resume shell ready."
                echo "Install: npm install"
                echo "Develop: npm run dev"
                echo "Render: npm run render:preview"
                echo "Chrome: $CHROME_PATH"
              fi
            '';
          };
        }
      );
    };
}
