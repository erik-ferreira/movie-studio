import { useState, useEffect } from "react";
import { Image, View, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { useTheme } from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { Star, HeartStraight, DownloadSimple } from "phosphor-react-native";

import { MovieDTO, ImageProps } from "../../dtos/MovieDTO";

import { getUrlMovie } from "../../requests";

import { ButtonIcon } from "../ButtonIcon";

import { fixDateMovie } from "../../utils";

import {
  ContainerCardMovieDetails,
  ContentHeaderCard,
  ImageMovie,
  BlockRightHeader,
  Label,
  Value,
  TitleMovie,
  ContentEvaluation,
  TextEvaluation,
  ContentSectionButtons,
  ButtonSection,
  TextButtonSection,
  SinopseText,
  ContentImagesGallery,
} from "./styles";

interface CardMovieDetailsProps {
  movie: MovieDTO;
  imagesMovie: ImageProps[];
  isMovieFavorite?: boolean;
  onPressFavorite?: () => void;
}

export function CardMovieDetails({
  movie,
  imagesMovie,
  isMovieFavorite = false,
  onPressFavorite,
}: CardMovieDetailsProps) {
  const theme = useTheme();
  const navigation = useNavigation();

  const weightIcon = isMovieFavorite ? "fill" : "regular";
  const release_date = movie?.release_date
    ? fixDateMovie(movie?.release_date)
    : "";
  const formatGenres = movie?.genres?.map((genre) => genre.name).join(", ");
  const formatCompanies = movie?.production_companies
    ?.map((companie) => companie.name)
    .join(", ");

  const [sectionSelected, setSectionSelected] = useState<"sinopse" | "gallery">(
    "sinopse"
  );

  const [canAskAgainPermission, setCanAskAgainPermission] = useState(true);

  async function getDefaultPermissionMediaLibrary() {
    const permission = await MediaLibrary.getPermissionsAsync();

    setCanAskAgainPermission(permission.canAskAgain);
  }

  async function getPermissionUserToAccessMediaLibrary() {
    const permission = await MediaLibrary.requestPermissionsAsync();

    setCanAskAgainPermission(permission.canAskAgain);

    return permission.status === "granted";
  }

  async function downloadImage(path: string, uri: string) {
    const filename = path.substring(1);

    try {
      if (canAskAgainPermission) {
        const userGavePermission =
          await getPermissionUserToAccessMediaLibrary();

        if (userGavePermission) {
          const fileUri: string = `${FileSystem.documentDirectory}${filename}`;

          const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);

          const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);

          const albumDownload = await MediaLibrary.getAlbumAsync("Download");

          if (albumDownload == null) {
            await MediaLibrary.createAlbumAsync("Download", asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync(
              [asset],
              albumDownload,
              false
            );
          }

          Alert.alert("", "Arquivo salvo com sucesso!");
        } else {
          Alert.alert("", "Precisamos da sua permissão para salvar o arquivo.");
        }
      } else {
        // if not can ask again permission
        Alert.alert(
          "",
          "Você precisa ir até as configurações do aplicativo para nos dar permissão para salvar o arquivo."
        );
      }
    } catch (err) {
      Alert.alert("", "Ocorreu um problema ao baixar o arquivo");
    }
  }

  useEffect(() => {
    getDefaultPermissionMediaLibrary();
  }, []);

  return (
    <ContainerCardMovieDetails>
      <TitleMovie>{movie.title}</TitleMovie>

      <ButtonIcon
        onPress={onPressFavorite}
        icon={HeartStraight}
        iconProps={{ weight: weightIcon, color: theme.colors.secondary }}
        style={{ position: "absolute", right: 16, top: 16, zIndex: 1 }}
      />

      <ContentHeaderCard>
        <ImageMovie
          source={{
            uri: getUrlMovie(movie.poster_path),
          }}
          resizeMode="contain"
        />

        <BlockRightHeader>
          <Label>Data de lançamento:</Label>
          <Value>{release_date}</Value>

          <Label>Gêneros</Label>
          <Value>{formatGenres}</Value>

          <Label>Empresas:</Label>
          <Value>{formatCompanies}</Value>

          <ContentEvaluation>
            <Label>Avaliação:</Label>

            <TextEvaluation>{movie.vote_average}</TextEvaluation>
            <Star size={20} weight="fill" color={theme.colors.secondary} />
          </ContentEvaluation>
        </BlockRightHeader>
      </ContentHeaderCard>

      <ContentSectionButtons>
        <ButtonSection
          onPress={() => setSectionSelected("sinopse")}
          isSelected={sectionSelected === "sinopse"}
        >
          <TextButtonSection isSelected={sectionSelected === "sinopse"}>
            Sinopse
          </TextButtonSection>
        </ButtonSection>

        <ButtonSection
          onPress={() => setSectionSelected("gallery")}
          isSelected={sectionSelected === "gallery"}
        >
          <TextButtonSection isSelected={sectionSelected === "gallery"}>
            Galeria
          </TextButtonSection>
        </ButtonSection>
      </ContentSectionButtons>

      {sectionSelected === "sinopse" ? (
        <SinopseText>{movie.overview}</SinopseText>
      ) : (
        <ContentImagesGallery>
          {imagesMovie.length === 0 ? (
            <SinopseText style={{ textAlign: "center" }}>
              Nenhuma imagem encontrada
            </SinopseText>
          ) : (
            imagesMovie.map((image) => (
              <View style={{ position: "relative" }}>
                <Image
                  key={image.file_path}
                  source={{ uri: getUrlMovie(image.file_path) }}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    height: 240,
                  }}
                />

                <ButtonIcon
                  icon={DownloadSimple}
                  onPress={() =>
                    downloadImage(image.file_path, getUrlMovie(image.file_path))
                  }
                  style={{ position: "absolute", zIndex: 1, top: 32, left: 8 }}
                />
              </View>
            ))
          )}
        </ContentImagesGallery>
      )}
    </ContainerCardMovieDetails>
  );
}
